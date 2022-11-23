import { ClientEvents } from "../../api";
import { Message } from "../../api/utils/Message"
import { client } from "../app";
import { CommandContext } from "../utils/BaseCommand";
import Event from "../utils/Event";

export default new class MessageEvent implements Event {
    on: keyof ClientEvents = "message";

    async invoke (message: Message) {
        if ( message.author.bot ) return;

        const prefix = ["a!", "//"];
        const args = message.content.slice(1).trim().split(/ + /g);
        const cmd = args.shift()?.toLowerCase();

        const command = client.commands.get(cmd as string);
        if ( !command ) return;

        const ctx = new CommandContext(message);
        await command.execute(ctx, ...args);
    };
}