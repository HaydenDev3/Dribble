import BaseCommand, { CommandConfigData } from "../../utils/BaseCommand"
import { ExtendedClient } from "../../utils/ExtendedClient"

export default new class PingCommand implements BaseCommand {
    config: CommandConfigData = {
        name: "ping",
        description: ""
    }

    execute = (...args: any[]) => {
        
    }
}