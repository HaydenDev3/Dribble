import BaseCommand, { CommandConfigData, CommandContext } from "../../utils/BaseCommand"
import { ExtendedClient } from "../../utils/ExtendedClient"
import Log from "../../utils/Log"

export default new class PingCommand implements BaseCommand {
    config: CommandConfigData = {
        name: "ping",
        description: "The best command ever created!",
        aliases: ["pong", "hello"]
    }

    execute = async (ctx: CommandContext, ...args: any[]) => {
        try {
            // await ctx.client.rest.createMessage({
            //     content: `Hello World`
            // }, ctx.channel.id)
        } catch (err) {
            Log.error(err);
            // await ctx.client.rest.createMessage({
            //     content: `:warning: **An error occured** \`\`\`js\n${err}\`\`\``
            // }, ctx.channel.id)
        }
    }
}