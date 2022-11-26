import { ClientEvents } from "../../api";
import * as Utils from "../../api/utils";
import { GatewayPayload } from "../../api/utils/GatewayPayload";
import Event from "../utils/Event";
import "colors";

export default new (class MessageEvent implements Event {
  on: keyof ClientEvents = "debug";

  async invoke(data: GatewayPayload) {
    console.log(String(data).grey);
  }
})();
