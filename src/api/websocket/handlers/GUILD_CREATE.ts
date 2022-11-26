import { Client } from "../../";
import ClientUser from "../../utils/Client/User";
import { GatewayPayload } from "../../utils/GatewayPayload";
import * as Utils from "../../utils/";
import Guild from "../../utils/Guild/Guild";
import { GuildChannel } from "../../utils/channels/GuildChannel";

export default async function (client: Client, payload: GatewayPayload) {
  const { d: guild } = payload;

  if (client.guilds.has(guild.id)) {
    const cachedGuild = client.guilds.get(guild.id);
    client.emit("guildCreate", cachedGuild);
  } else {
    const roles = Utils.Resolvers.resolveRoles(client, guild.roles);
    const emojis = Utils.Resolvers.resolveEmojis(client, guild.emojis);
    const newGuild = Utils.Resolvers.buildGuildInstance(guild);
    const channels = Utils.Resolvers.resolveChannels(
      client,
      guild,
      guild.channels ?? []
    );
    const members = Utils.Resolvers.resolveGuildMembersAndUsers(
      client,
      newGuild,
      guild.members
    );

    newGuild.channels = channels;
    newGuild.members = members;
    newGuild.emojis = emojis;
    newGuild.roles = roles;

    client.guilds.set(newGuild.id, newGuild);
    client.emit("guildCreate", newGuild);
  }
  client.emit("guildCreate", guild);
}
