import { ApplicationCommandDataResolvable, ChatInputCommandInteraction, ContextMenuCommandBuilder, ContextMenuCommandInteraction, Guild, GuildMember, Message, SlashCommandBuilder, TextChannel } from "discord.js";
import { client } from "../app";
import { ExtendedClient } from "./ExtendedClient";

export class CommandContext {
  public client: ExtendedClient;
  public member: GuildMember;
  public channel: TextChannel;
  public guild: Guild;

  constructor(public interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction) {
    this.client = client;
    this.member = interaction.member as GuildMember;
    this.channel = interaction.channel as TextChannel;
    this.guild = interaction.guild as Guild;
  }
}

export default interface BaseCommand {
  data: any | ApplicationCommandDataResolvable;
  execute: (...args: any[]) => void;
}
