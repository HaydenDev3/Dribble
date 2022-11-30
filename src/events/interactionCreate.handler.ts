import { ChatInputCommandInteraction, ClientEvents, EmbedBuilder } from "discord.js";
import { CommandContext } from "../utils/BaseCommand";
import { Deps } from "../utils/Deps";
import Event from "../utils/Event";
import { ExtendedClient } from "../utils/ExtendedClient";

export default new class InteractionCreateHandler implements Event {
    on: keyof ClientEvents = "interactionCreate";

    constructor (private client: ExtendedClient = Deps.get<ExtendedClient>(ExtendedClient)) {};

    invoke = async (interaction: ChatInputCommandInteraction) => {
        if ( !interaction.isChatInputCommand() ) return;
        
        await interaction.deferReply().catch(() => {});
        const command = this.client.commands.get(interaction.commandName);
        if ( !command ) return interaction.followUp({
            embeds: [
                new EmbedBuilder()
                    .setColor(`Blurple`)
                    .setDescription(`> :x: The command failed and there is 2 possible reasons A. The command is deploying or B. The command was deleted/removed.`)
            ]
        });

        const ctx: CommandContext = new CommandContext(interaction);
        await command.execute(ctx);
    };
}