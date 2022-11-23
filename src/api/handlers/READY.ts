import { Client } from "..";
import ClientUser from "../utils/Client/User";
import { GatewayPayload } from "../utils/GatewayPayload";

export default function (client: Client, payload: GatewayPayload) {
    let { user } = payload.d;

    client.user = new ClientUser(
        user.username,
        user.discriminator,
        user.verified,
        user.id,
        user.flags,
        user.email,
        user.bot,
        user.avatar
    );

    client.emit('ready');
};