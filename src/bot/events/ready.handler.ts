import { ClientEvents } from "../../api";
import { registerCommands } from "../utils";
import Event from "../utils/Event";
import { ExtendedClient } from "../utils/ExtendedClient";
import Log from "../utils/Log";

export default new (class ReadyHandler implements Event {
  on: keyof ClientEvents = "ready";

  async invoke(client: ExtendedClient) {
    Log.info(
      process.env.READY_MESSAGE,
      "BOT"
    );
    registerCommands(`${process.cwd()}/src/bot`);
  }
})();
