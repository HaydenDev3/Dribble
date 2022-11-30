import { ClientEvents, GatewayReceivePayload } from "discord.js";
import Event from "../utils/Event";
import "colors";

export default new (class MessageEvent implements Event {
  on: keyof ClientEvents = "debug";

  async invoke(data: GatewayReceivePayload) {
    console.log(String(data).grey);
  }
})();
