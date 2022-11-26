import Guild from "../Guild/Guild";
import { Client } from "../../";
import { ChannelTypeDef } from "../customs/ChannelType";
import TextBasedChannel from "./TextBasedChannel";
import { MessageOptions } from "../message/MessageOptions";
import Collection from "../Collection";
import { Message } from "../message/Message";
import { buildMessage } from "../../utils/resolvers";
import { MessageEmbed } from "../message/embeds/Embeds";
import { BaseChannel } from "./BaseChannel";

export class DMChannel extends BaseChannel {
  _messages: Collection<string, Message> = new Collection();

  constructor(
    _id: string,
    _client: Client,
    _type: ChannelTypeDef,
    _lastMessageId: string,
    _lastPinTimestamp: Date,
    _name: string,
    _position: number
  ) {
    super(_client, _id, _name, _type);
  }

  get messages(): Collection<string, Message> {
    return this._messages;
  }

  async send(payload: string | MessageOptions | MessageEmbed) {
    if (typeof payload === "string") {
      const body: MessageOptions = { content: payload };
      const response = await this.client.rest.createMessage(body, this.id);
      return await buildMessage(this.client, response);
    }
    if (payload instanceof MessageEmbed) {
      const options: MessageOptions = payload as any;
      const response = await this.client.rest.createMessage(options, this.id);
      return await buildMessage(this.client, response);
    }
    const response = await this.client.rest.createMessage(payload, this.id);
    return await buildMessage(this.client, response);
  }
}
