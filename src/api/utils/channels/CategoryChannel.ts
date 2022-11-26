import { GuildChannel } from "../channels/GuildChannel";
import { Client } from "../../";
import { ChannelType, ChannelTypeDef } from "../customs/ChannelType";
import Guild from "../Guild/Guild";

export class CategoryChannel extends GuildChannel {
  constructor(
    _id: string,
    _client: Client,
    _type: ChannelTypeDef,
    _lastMessageId: string,
    _lastPinTimestamp: Date,
    _name: string,
    _position: number,
    _parentId: string,
    _topic: string,
    _guild: Guild,
    _permissionOverwrites: Array<any>,
    _nsfw: boolean,
    _rateLimitPerUser: number,
  ) {
    super(
      _id,
      _client,
      _type,
      _lastMessageId,
      _lastPinTimestamp,
      _name,
      _position,
      _parentId,
      _topic,
      _guild,
      _permissionOverwrites,
      _nsfw,
      _rateLimitPerUser,
    );
  }
}