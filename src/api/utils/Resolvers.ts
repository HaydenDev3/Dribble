import { Client } from "..";
import Log from "../../bot/utils/Log";
import { TextChannel } from "./channels/TextChannel";
import Collection from "./Collection";
import { ChannelType, ChannelTypeDef } from "./customs/ChannelType";
import Emoji from "./Emoji";
import Guild from "./Guild/Guild";
import GuildMember from "./Guild/GuildMember";
import { MessageEmbed } from "./message/embeds/MessageEmbed";
import { Message } from "./message/Message";
import User from "./User/User";
import Role from "./Guild/GuildRole";
import { GuildChannel } from "./channels/GuildChannel";
import { CategoryChannel } from "./channels/CategoryChannel";
import { VoiceChannel } from "./channels/VoiceChannel";
import { BaseChannel } from "./channels/BaseChannel";
import { APIGuildMessagePayload } from "./GatewayPayload";
import { APIComponentRow, APIEmbed } from "./message/MessageOptions";

export function buildCategoryChannel(client: Client, guild: Guild, c: any) {
  return new CategoryChannel(
    c.id,
    client,
    ChannelTypeDef.CATEGORY,
    c.last_message_id,
    c.last_pin_timestmap,
    c.name,
    c.position,
    c.parent_id,
    c.topic,
    guild,
    c.permission_overwrites,
    c.nsfw,
    c.rate_limit_per_user
  );
}

export function resolveChannels(
  client: Client,
  guild: Guild,
  channels: Array<any>
) {
  const channelsMap = new Collection<string, GuildChannel>();
  for (const c of channels) {
    let channel;
    switch (c.type) {
      case ChannelType.TEXT:
        channel = buildTextChannel(client, guild, c);
        break;
      case ChannelType.CATEGORY:
        channel = buildCategoryChannel(client, guild, c);
        break;
      case ChannelType.VOICE:
        channel = buildVoiceChannel(client, guild, c);
        break;
      default:
        channel = new BaseChannel(
          client,
          c.id,
          c?.name,
          ChannelTypeDef.UNKNOWN
        );
        break;
    }
    client.channels.set(channel.id, channel);
  }
  return channelsMap;
}

export function buildVoiceChannel(
  client: Client,
  guild: Guild,
  c: any
): VoiceChannel {
  return new VoiceChannel(
    c.id,
    client,
    ChannelTypeDef.VOICE,
    c.last_message_id,
    c.last_pin_timestmap,
    c.name,
    c.position,
    c.parent_id,
    c.topic,
    guild,
    c.permission_overwrites,
    c.nsfw,
    c.rate_limit_per_user
  );
}

export function resolveEmojis(client: Client, emojis: Array<any>) {
  const emojiMap = new Collection<string, Emoji>();
  for (const emoji of emojis) {
    const emojiRoles = emoji.roles;
    const roles = new Collection();
    for (const role of emojiRoles) roles.set(role.id, buildRoleInstance(role));
    const emojiInstance = buildEmojiInstance(emoji, roles);
    emojiMap.set(emojiInstance.id, emojiInstance);
    client.emojis.set(emojiInstance.id as string, emojiInstance);
  }
  return emojiMap;
}

export function buildEmojiInstance(
  emoji: any,
  roles: Collection<string, any>
): Emoji {
  return new Emoji(
    emoji.id,
    emoji.name,
    roles,
    emoji.users,
    emoji.required_colons,
    emoji.managed,
    emoji.animated,
    emoji.available
  );
}

export function buildRoleInstance(role: any): any {
  return new Role(
    role.id,
    role.name,
    role.color,
    role.hoist,
    role.position,
    role.permissions,
    role.managed,
    role.mentionable
  );
}

export function resolveRoles(client: Client, roles: Array<any>) {
  const rolesMap = new Collection<string, any>();
  for (const role of roles) {
    rolesMap.set(
      role.id,
      new Role(
        role.id,
        role.name,
        role.color,
        role.hoist,
        role.position,
        role.permissions,
        role.managed,
        role.mentionable
      )
    );
  }
  return rolesMap;
}

export function buildUser(client: Client, user: any) {
  return new User(
    user.id,
    client,
    user.username,
    user.discriminator,
    user.avatar,
    user.bot,
    user.system,
    user.mfa_enabled,
    user.locale,
    user.verified,
    user.flags,
    user.premium_type,
    user.public_flags
  );
}

export function buildTextChannel(client: Client, guild: Guild, c: any) {
  return new TextChannel(
    c.id,
    client,
    ChannelTypeDef.TEXT,
    c.last_message_id,
    c.last_pin_timestmap,
    c.name,
    c.position,
    c.parent_id,
    c.topic,
    guild,
    c.permission_overwrites,
    c.nsfw,
    c.rate_limit_per_user
  );
}

export async function buildMessage(client: Client, message_payload: APIGuildMessagePayload) {
  const { channel_id, guild_id, author, embeds, components } = message_payload;
  var channel = client.channels.get(channel_id);
  var guild: Guild = client.guilds.get(guild_id);
  var user: User = client.users.get(author?.id);
  if ( !channel ) channel = await client.rest.fetchChannel(channel_id);

  const type: ChannelType = getChannelType(channel.type);
  if ( !guild ) {
    const now = performance.now();
    guild = await client.rest.fetchGuild(guild_id) as any;
    const end = performance.now();
    Log.info(
      `Took ${Math.round(end - now)}ms to fetch guild.`,
      "Discord Rest Handler"
    );
  }

  if ( !user ) {
    const now = performance.now();
    user = await client.rest.fetchUser(author?.id) as any;
    const end = performance.now();
    Log.info(
      `Took ${Math.round(end - now)}ms to fetch guild.`,
      "Discord Rest Handler"
    );
  }

  const member = guild.members.get(author?.id) as GuildMember;
  const message: Message = buildMessageInstance(
    message_payload,
    client,
    channel,
    guild,
    user,
    member
  );
  const messageEmbeds: Array<MessageEmbed | APIEmbed> = buildMessageEmbeds(embeds as any[]);
  message.embeds = messageEmbeds;
  return message;
}

export function buildMessageInstance(
  message_payload: any,
  client: Client,
  channel: TextChannel,
  guild: Guild | null,
  user: User,
  member: GuildMember | null
): Message | any {
  const {
    id,
    content,
    timestamp,
    edited_timestamp,
    tts,
    mention_everyone,
    nonce,
    pinned,
    type,
  } = message_payload;
  return new Message(
    client,
    id,
    channel,
    guild,
    user,
    member,
    content,
    timestamp,
    edited_timestamp,
    tts,
    mention_everyone,
    nonce,
    pinned,
    type
  );
}

export function buildMessageEmbeds (embeds: Array<APIEmbed>) {
  const msgEmbeds: Array<MessageEmbed> = [];
  for ( const embed of embeds ) {
    console.log(embed);
    msgEmbeds.push(
      new MessageEmbed(
        embed.title,
        embed.type,
        embed.description,
        embed.url,
        embed.timestamp,
        embed.color
      )
    );
  }

  return msgEmbeds;
}

export function getChannelType(type: number): ChannelType {
  if (type === 0) return ChannelType.TEXT;
  if (type === 1) return ChannelType.DM;
  if (type === 2) return ChannelType.VOICE;
  if (type === 3) return ChannelType.DM;
  if (type === 4) return ChannelType.CATEGORY;
  if (type === 5) return ChannelType.NEWS;
  if (type === 6) return ChannelType.STORE;
  return ChannelType.UNKNOWN;
}

export function resolveGuildMembersAndUsers(
  client: Client,
  newGuild: Guild,
  members: Array<any>
) {
  const membersMap = new Collection();
  for (const member of members) {
    const { user } = member;
    const newUser = buildUser(client, user);
    client.users.set(newUser.id, newUser);
    const roles = new Collection<string, Role>();
    for (const role of member.roles) roles.set(role, newGuild.roles.get(role));
    membersMap.set(
      newUser.id,
      new GuildMember(
        newUser.id,
        newUser,
        member.nick,
        roles,
        member.joined_at,
        member.premium_since,
        member.deaf,
        member.mute
      )
    );
  }
  return membersMap;
}

export function buildGuildInstance(guild: Guild | any) {
  return new Guild(
    guild.id,
    guild.name,
    guild.icon,
    guild.description,
    guild.splash,
    guild.discovery_splash,
    guild.features,
    guild.banner,
    guild.owner_id,
    guild.application_id,
    guild.region,
    guild.afk_channel_id,
    guild.afk_timeout,
    guild.system_channel_id,
    guild.widget_enabled,
    guild.widget_channel_id,
    guild.verification_level,
    guild.default_message_notifications,
    guild.mfa_level,
    guild.explicit_content_filter,
    guild.max_presences,
    guild.max_members,
    guild.max_video_channel_users,
    guild.vanity_url_code,
    guild.premium_tier,
    guild.premium_subscription_count,
    guild.system_channel_flags,
    guild.preferred_locale,
    guild.rules_channel_id,
    guild.public_updates_channel_id,
    guild.embed_enabled,
    guild.embed_channel_id
  );
}
