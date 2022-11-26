import Guild from "../Guild/Guild";
import User from "../User/User";
import GuildMember from "../Guild/GuildMember";
import { Client } from "../..";
import { TextChannel } from "../channels/TextChannel";
import { MessageEmbed } from "./embeds/MessageEmbed";
import * as Utils from "../";
import { APIComponentRow } from "./MessageOptions";

export class Message {
  /**
   * Array of any objects
   */
  private _embeds: Array<MessageEmbed> = [];
  private _components: Array<APIComponentRow> = [];

  /**
   * Array  of Attachments
   */
  private _attachments: Array<any> = [];
  /**
   * Array of message reactions
   */
  //   private _reactions: Map<string, MessageReaction> = new Map();
  /**
   * Creates an instance of message.
   * @param _id id of the message
   * @param _channel channel the message was sent in
   * @param _guild the guild the message was sent in
   * @param _author the author of the message
   * @param _member the member of the message
   * @param _content the message content
   * @param _timestamp the time the message was sent at
   * @param _editedAt the time the message was edited at
   * @param _tts whether this message is tts
   * @param _mentionedEveryone whether this message mentions everyone
   * @param _nonce
   * @param _pinned
   * @param _type
   */
  constructor(
    private _client: Client,
    private _id: string,
    private _channel: TextChannel,
    private _guild: Guild | null,
    private _author: User,
    private _member: any | null,
    private _content: string,
    private _timestamp: Date,
    private _editedAt: Date,
    private _tts: boolean,
    private _mentionedEveryone: boolean,
    private _nonce: number | string,
    private _pinned: boolean,
    private _type: number
  ) {}

  public async edit(payload: string | MessageEmbed) {
    if (typeof payload === 'string')
      return this.channel.client.rest.editMessage({ content: payload }, this.channel.id, this.id);
    if (payload instanceof MessageEmbed)
      return this.channel.client.rest.editMessage(payload as any, this.channel.id, this.id);
  }

  /**
   * Fetchs message
   * @returns Promise<Message> the message that was fetched
   */
  public async fetch(): Promise<Message> {
    if (this.channel.messages.has(this.id)) {
      console.log('In cache');
      return this;
    }
    else {
      const response = await this.channel.client.rest.fetchMessage(this.channel.id, this.id);
      return await Utils.Resolvers.buildMessage(this.channel.client, response);
    }
  }

  public async pin(): Promise<Message> {
    await this.channel.client.rest.pinMessage(this.channel.id, this.id);
    return this;
  }

  public get client(): Client {
    return this._client;
  }
  public get id(): string {
    return this._id;
  }
  public get channel(): TextChannel {
    return this._channel;
  }
  public get author(): User {
    return this._author;
  }
  public get guild(): Guild | null {
    return this._guild;
  }
  public get member(): GuildMember | null {
    return this._member;
  }
  public get timestamp(): Date {
    return this._timestamp;
  }
  public get editedAt(): Date {
    return this._editedAt;
  }
  public get tts(): boolean {
    return this._tts;
  }
  public get mentionedEveryone(): boolean {
    return this._mentionedEveryone;
  }
  public get attachments(): Array<any> {
    return this._attachments;
  }
  public get embeds(): Array<any> {
    return this._embeds;
  }
  public get components(): Array<any> {
    return this._components;
  }
  //   public get reactions(): Map<string, any> { return this._reactions; }
  public get nonce(): number | string {
    return this._nonce;
  }
  public get pinned(): boolean {
    return this._pinned;
  }
  public get type(): number {
    return this._type;
  }
  public get content(): string {
    return this._content;
  }

  public set embeds(embeds: Array<any>) {
    this._embeds = embeds;
  }
}
