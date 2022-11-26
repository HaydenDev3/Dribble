import { Client } from "../../";
import * as Utils from "../../utils";

export default async function (client: Client, payload: Utils.Payloads.GatewayPayload) {
  const { d: message_payload } = payload;
  const message = await Utils.Resolvers.buildMessage(client, message_payload);
  message.channel.messages.set(message.id, message);
  client.emit("message", message);
}