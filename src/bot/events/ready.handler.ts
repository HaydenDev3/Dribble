import { ClientEvents } from "../../api";
import { registerCommands } from "../utils";
import Event from "../utils/Event";
import { ExtendedClient } from "../utils/ExtendedClient";
import Log from "../utils/Log";

export default new (class ReadyHandler implements Event {
  on: keyof ClientEvents = "ready";

  async invoke(client: ExtendedClient) {
    Log.info(
      `Hello world, a discord api handler made with love.\nTechnologies used:\n\b1. TypeScript\n\b2. Websockets`
    );
    registerCommands(`${process.cwd()}/src/bot`);
  }
})();
