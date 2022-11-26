import Guild from "../Guild/Guild";
import { Client } from "../../";
import { GuildChannel } from "./GuildChannel";
import { ChannelTypeDef } from "../customs/ChannelType";
import TextBasedChannel from "./TextBasedChannel";
import { MessageOptions } from "../message/MessageOptions";
import Collection from "../Collection";
import { Message } from "../message/Message";
import { buildMessage } from "../Resolvers";
import { MessageEmbed } from "../message/embeds/Embeds";
import { MessageCollectorOptions } from "../customs/CollectorOptions";
import { MessageCollector } from "../collectors/MessageCollectors";

export class TextChannel extends GuildChannel implements TextBasedChannel {
    private _messages: Collection<string, Message> = new Collection();

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
        _rateLimitPerUser: number
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
            _rateLimitPerUser
        );
    }

    get messages(): Collection<string, Message> {
        return this._messages;
    }

    async send(payload: string | MessageOptions | MessageEmbed) {
        if (typeof payload === "string") {
            const body: MessageOptions = { content: payload };
            const response = await this.client.rest.createMessage(
                body,
                this.id
            );
            response.guild_id = this.guild.id;
            return await buildMessage(this.client, response);
        }

        if (payload instanceof MessageEmbed) {
            const options: MessageOptions = payload as any;
            const response = await this.client.rest.createMessage(
                options,
                this.id
            );
            response.guild_id = this.guild.id;
            return await buildMessage(this.client, response);
        }

        const response = await this.client.rest.createMessage(payload, this.id);
        response.guild_id = this.guild.id;
        return await buildMessage(this.client, response);
    }

    async awaitMessages(
        filter: Function,
        options?: MessageCollectorOptions
    ): Promise<Collection<string, Message>> {
        return new Promise((resolve, reject) => {
            const collector = new MessageCollector(this, filter, options);
            collector.on("end", (collected: Collection<string, Message>) => {
                resolve(collected);
            });
        });
    }
}
