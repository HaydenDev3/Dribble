import { TextChannel } from "../../api/utils/channels/TextChannel";
import Guild from "../../api/utils/Guild/Guild";
import GuildMember from "../../api/utils/Guild/GuildMember";
import { client } from "../app";
import { ExtendedClient } from "./ExtendedClient";

export interface CommandConfigData {
  name: string;
  description?: string;
  permissions?: any;
  cooldown?: number;
  aliases?: string[];
}

export class CommandContext {
  public client: ExtendedClient;
  public member: GuildMember;
  public channel: TextChannel;
  public guild: Guild;

  constructor(public message: any) {
    this.client = client;
    this.member = message.member as GuildMember;
    this.channel = message.channel as TextChannel;
  }
}

export default interface BaseCommand {
  config: CommandConfigData;
  execute: (...args: any[]) => void;
}
