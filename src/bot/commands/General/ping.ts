import { ExtendedClient } from "../../utils/ExtendedClient"

export default {
    config: {
        name: "ping",
        description: "get the bot ping"
    },

    async execute ({ client, message, args }: { client: ExtendedClient, message: any, args: string[] }) {
        console.log(args);
    },
}