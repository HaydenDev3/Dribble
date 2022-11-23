import BaseCommand, { CommandConfigData, CommandContext } from "../../utils/BaseCommand"
import { ExtendedClient } from "../../utils/ExtendedClient"

export default new class PingCommand implements BaseCommand {
    config: CommandConfigData = {
        name: "ping",
        description: ""
    }

    execute = (ctx: CommandContext, ...args: any[]) => {
        console.log(ctx.message.guild)
    }
}