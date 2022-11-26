import { Client } from "../../";
import ClientUser from "../../utils/Client/User";
import { GatewayPayload } from "../../utils/GatewayPayload";

export default function (client: Client, payload: GatewayPayload) {
  console.log(payload.d);
  client.emit("channelUpdate", payload.d, payload.d);
}
