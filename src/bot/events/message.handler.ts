import { ClientEvents } from "../../api";
import * as Utils from "../../api/utils";
import { Message } from "../../api/utils/message";
import { client } from "../app";
import { SavedGuild } from "../data/guild";
import { CommandContext } from "../utils/BaseCommand";
import Event from "../utils/Event";

export default new class MessageEvent implements Event {
    on: keyof ClientEvents = "message";

    async invoke (message: any) {
        if ( message.author.bot ) return;

        const savedGuild = await SavedGuild.findOne({ _id: message.guild.id })
            || new SavedGuild({ _id: message.guild.id });
        const args = message.content.slice(savedGuild.prefix.length).trim().split(/ + /g);
        const cmd = args.shift()?.toLowerCase() as string;

        const command = client.commands.get(cmd || client.aliases.get(cmd) as string);
        if ( !command ) return;

        const ctx = new CommandContext(message);
        await command.execute(ctx, ...args);
    };
}