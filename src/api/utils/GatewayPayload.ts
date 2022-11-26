import GuildRole from "./Guild/GuildRole";
import GuildMember from "./Guild/GuildMember";
import { MessageEmbed } from "./message/embeds/MessageEmbed";
import { APIComponentRow } from "./message/MessageOptions";
import User from "./User/User";

export interface GatewayPayload {
  op: number;
  d: any;
  t: any;
}

export const GatewayIdentifier = {
  op: 2,
  d: {
    token: "",
    properties: {
      $os: "linux",
      $browser: "chrome",
      $device: "chrome",
    },
  },
};

export interface APIGuildMessagePayload {
  id: string;
  guild_id: string;
  channel_id: string;
  author: User;
  embeds: MessageEmbed[];
  components: APIComponentRow[];
  member: GuildMember;
  flags: number;
  tts: boolean;
  attachments: any[];
  edited_timestamp: any;
  pinned: boolean;
  referenced_message?: any;
  timestamp: any;
  type?: number;
  nonce: string;
  mentions?: User[];
  mention_roles?: GuildRole[];
  mention_everyone: boolean;
}

export const GatewayHeartbeat = {
  op: 1,
  d: null,
};

export const headers = {
  "Content-Type": "application/json",
  Authorization: "",
};
