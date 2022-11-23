import EventEmitter from "events";
import WebSocket from "ws";
import { Constants } from "./utils/Constants";
import WebSocketManager from "./WebSocket/manager";

export interface ClientEvents {
    channelCreate: (channel: any) => void;
    channelUpdate: (oldChannel: any, newChannel: any) => void;
    channelDelete: (channel: any) => void;
    channelPinsUpdate: (channel: any, time: Date) => void;
    debug: (...args: any) => void;
    guildCreate: (guild: any) => void;
    guildUpdate: (oldGuild: any, newGuild: any) => void;
    guildDelete: (guild: any) => void;
    ready: () => void;
    resumed: () => void;
    message: (message: any) => void;
    messageReactionAdd: (reaction: any, user: any) => void;
    messageReactionRemove: (reaction: any, user: any) => void;
    voiceStateUpdate: (oldState: any, newState: any) => void;
}

export declare interface Client {
    user: any;
    guilds: Map<string, any>;
    channels: Map<string, any>;
    users: Map<string, any>;
    emojis: Map<string, any>;
    socket: WebSocketManager;
  
    on<Event extends keyof ClientEvents>(
      event: Event,
      listener: ClientEvents[Event],
    ): this;
    off<Event extends keyof ClientEvents>(
      event: Event,
      listener: ClientEvents[Event]
    ): this;
    emit<Event extends keyof ClientEvents>(
      event: Event,
      ...args: Parameters<ClientEvents[Event]>
    ): boolean;
}

export class Client extends EventEmitter {
    private websocket: WebSocketManager = new WebSocketManager(this);
    private token!: string;

    constructor () {
        super();
        return this;
    };

    public connect (token: string) {
        try {
            this.websocket.connect(token);
            this.token = token;
        } catch (err: any) {
            console.log(err.stack)
        }
    }

    public async createMessage (content: string  | any, channelId: string, attachments?: any[]) {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bot ${this.token}`
            }
            const response = await fetch(`${Constants.API_URL}/channels/${channelId}/messages`, {
                method: "POST",
                headers,
                body: JSON.stringify(
                    !content.components ?? !content.embeds ? {
                        content: content,
                        tts: false
                    } : {
                        embeds: content.embeds,
                        content: content,
                        components: content.components
                    }
                )
            });

            const json = response.json();
            console.log(json)
        } catch (err) {

        }
    }
}