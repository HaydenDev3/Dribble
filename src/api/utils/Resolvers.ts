import { Client } from "..";
import { Log } from "../../bot/utils";
import { TextChannel } from "./channels/TextChannel";
import { ChannelType, ChannelTypeDef } from "./customs/ChannelType";
import Guild from "./Guild/Guild";
import GuildMember from "./Guild/GuildMember";
import { MessageEmbed } from "./message/embeds/MessageEmbed";
import { Message } from "./message/Message";
import User from "./User/User";

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

export async function buildMessage(client: Client, message_payload: any) {
    const { channel_id, guild_id, author, embeds } = message_payload;
    let channel = client.channels.get(channel_id);
    let guild: Guild = client.guilds.get(guild_id);
    let user: User = client.users.get(author.id);
    if (!channel) channel = await client.rest.fetchChannel(channel_id);

    const type: ChannelType = getChannelType(channel.type);
    if (!guild) {
        const now = performance.now();
        guild = await client.rest.fetchGuild(guild_id);
        const end = performance.now();
        Log.info(
            `Took ${Math.round(end - now)}ms to fetch guild.`,
            "Discord Rest Handler"
        );
    }

    if (!user) {
        const now = performance.now();
        user = await client.rest.fetchUser(author.id);
        const end = performance.now();
        Log.info(
            `Took ${Math.round(end - now)}ms to fetch guild.`,
            "Discord Rest Handler"
        );
    }

    const member = guild.members.get(author.id) as GuildMember;
    const message: Message = buildMessageInstance(
        message_payload,
        client,
        channel,
        guild,
        user,
        member
    );
    const messageEmbeds: Array<MessageEmbed> = buildMessageEmbeds(embeds);
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

export function buildMessageEmbeds(embeds: Array<any>) {
    const msgEmbeds: Array<MessageEmbed> = [];
    for (const embed of embeds) {
        msgEmbeds.push(
            new MessageEmbed(
                embed?.title,
                embed?.type,
                embed?.description,
                embed?.url,
                embed?.timestamp,
                embed?.color
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
