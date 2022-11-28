import EventEmitter from "events";
import RestAPIHandler from "./websocket/rest";
import WebSocketManager from "./websocket/index";
import { GatewayPayload } from "./utils/GatewayPayload";
import { Message } from "./utils/message/Message";
import GuildMember from "./utils/Guild/GuildMember";

export interface ClientOptions {
  presence: PresenceData;
}

export interface PresenceData {
  activities: ActivityData[];
  status?: ActivityType;
  since?: Date;
  afk: boolean;
}

export type ActivityType = "idle" | "dnd" | "online" | "offline";

export enum PresenceType {
  Playing = 1,
  Watching = 2,
  Competing = 3,
  Streaming = 4
};

export interface ActivityData {
  name: string;
  url?: string;
  type: PresenceType;
}

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
  message: (message: Message) => void;
  interaction: (interaction: any) => void;
  guildMemberAdd: (member: GuildMember) => void;
  messageReactionAdd: (reaction: any, user: any) => void;
  messageReactionRemove: (reaction: any, user: any) => void;
  voiceStateUpdate: (oldState: any, newState: any) => void;
  reconnect: (data?: GatewayPayload) => void;
  disconnect: (data?: GatewayPayload) => void;
  hello: (data: GatewayPayload) => void;
  resume: (data: GatewayPayload) => void;
  autoModerationRuleCreate: (data: GatewayPayload) => void;
  autoModerationRuleDelete: (data: GatewayPayload) => void;
  autoModerationRuleUpdate: (
    oldData: any | GatewayPayload,
    newData: any | GatewayPayload
  ) => void;
  autoModerationExecute: (data: GatewayPayload) => void;
  typingStart: (data: GatewayPayload) => void;
  presenceUpdate: (data: GatewayPayload) => void;
}

export declare interface Client {
  user: any;
  guilds: Map<string, any>;
  channels: Map<string, any>;
  users: Map<string, any>;
  emojis: Map<string, any>;
  socket: WebSocketManager;
  rest: RestAPIHandler;

  on<Event extends keyof ClientEvents>(
    event: Event,
    listener: ClientEvents[Event]
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
  public options?: ClientOptions;

  constructor(options?: ClientOptions) {
    super();
    this.rest = new RestAPIHandler(this);

    this.options = options;

    this.guilds = new Map();
    this.channels = new Map();
    this.users = new Map();
    this.emojis = new Map();
    return this;
  }

  public connect(token: string) {
    try {
      this.websocket.connect(token);
      this.token = token;
    } catch (err: any) {
      console.log(err.stack);
    }
  }
}
