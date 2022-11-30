import { ClientEvents, Guild } from "discord.js";
import { registerCommands } from "../utils";
import Event from "../utils/Event";
import { ExtendedClient } from "../utils/ExtendedClient";
import Log from "../utils/Log";

export default new (class ReadyHandler implements Event {
  on: keyof ClientEvents = "ready";

  async invoke(client: ExtendedClient) {
    Log.info(process.env.READY_MESSAGE, "BOT");
    await registerCommands(`${process.cwd()}/src`);

    const guildId = process.env.GUILD_ID;

    if ( guildId ) {
      let guild = client.guilds.cache.get(guildId) as Guild;
      guild.commands.set(client.commandsArray);
    } else {
      client.application?.commands.set(client.commandsArray);
    };

    Log.info(`Loaded: ${parseInt(client.commandsArray.length as any)?.toLocaleString()} (/) Slash Commands`)
  }
})();
