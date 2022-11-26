import { Client } from "../..";
import { headers } from "../../utils/GatewayPayload";
import { Constants, EndPoints, StatusCode } from "../../utils/Constants";
import { MessageOptions } from "../../utils/message/MessageOptions";
import fetch from 'node-fetch';

export default class RestAPIHandler {
  private _token: string = "";

  constructor(private client: Client) {
    Object.defineProperty(this, "_token", {
      enumerable: false,
    });
  }

  async fetchGuilds() {
    const response = await fetch(
      `${Constants.API_URL}/${EndPoints.USER_GUILDS}`,
      { headers }
    );
    return response.body;
  }

  async fetchGuild(id: string) {
    const response = await fetch(
      `${Constants.API_URL}/${EndPoints.GUILDS}/${id}?with_counts=true`,
      { headers }
    );
    return response.body;
  }

  async fetchChannels(id: string) {
    const response = await fetch(
      `${Constants.API_URL}/${EndPoints.GUILDS}/${id}/${EndPoints.CHANNELS}`,
      { headers }
    );
    return response.body;
  }

  async fetchChannel(id: string) {
    const response = await fetch(
      `${Constants.API_URL}/${EndPoints.CHANNELS}/${id}`,
      { headers }
    );
    return response.body;
  }

  async fetchGuildMember(guildId: string, userId: string) {
    const response = await fetch(
      `${Constants.API_URL}/${EndPoints.GUILDS}/${guildId}/${EndPoints.MEMBERS}/${userId}`,
      { headers }
    );
    return response.body;
  }

  async fetchGuildMembers(guildId: string, count: number) {
    const response = await fetch(
      `${Constants.API_URL}/${EndPoints.GUILDS}/${guildId}/${EndPoints.MEMBERS}?limit=${count}`,
      { headers }
    );
    return response.body;
  }

  async fetchUser(userId: string) {
    const response = await fetch(
      `${Constants.API_URL}/${EndPoints.USERS}/${userId}`,
      { headers }
    );
    return response.body;
  }

  async fetchMessage(channelId: string, messageId: string): Promise<any> {
    const response = await fetch(
      `${Constants.API_URL}/${EndPoints.CHANNELS}/${channelId}/${EndPoints.MESSAGES}/${messageId}`,
      { method: "GET", headers }
    );
    return response.body;
  }

  async pinMessage(channelId: string, messageId: string): Promise<any> {
    return await fetch(
      `${Constants.API_URL}/${EndPoints.CHANNELS}/${channelId}/${EndPoints.PINS}/${messageId}`,
      { method: "PUT", headers }
    );
  }

  async unpinMessage(channelId: string, messageId: string): Promise<any> {
    return await fetch(
      `${Constants.API_URL}/${EndPoints.CHANNELS}/${channelId}/${EndPoints.PINS}/${messageId}`,
      { method: "DELETE", headers }
    );
  }

  async createMessage(options: MessageOptions, id: string) {
    const response = await fetch(
      `${Constants.API_URL}/${EndPoints.CHANNELS}/${id}/${EndPoints.MESSAGES}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(options),
      }
    );
    return response.body;
  }

  async deleteMessage(channelId: string, messageId: string) {
    return await fetch(
      `${Constants.API_URL}/${EndPoints.CHANNELS}/${channelId}/${EndPoints.MESSAGES}/${messageId}`,
      {
        method: "DELETE",
        headers,
      }
    );
  }

  async editMessage(
    options: MessageOptions,
    channelId: string,
    messageId: string
  ) {
    return await fetch(
      `${Constants.API_URL}/${EndPoints.CHANNELS}/${channelId}/${EndPoints.MESSAGES}/${messageId}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify(options),
      }
    );
  }

  async createReaction(channelId: string, messageId: string, emoji: any) {
    const response = await fetch(
      `${Constants.API_URL}/${EndPoints.CHANNELS}/${channelId}/${EndPoints.MESSAGES}/${messageId}/${EndPoints.REACTIONS}/${emoji}/@me`,
      {
        method: "PUT",
        headers,
      }
    );
    response.status ? new Error(response.statusText) : null;
    if (response.status === StatusCode.NO_CONTENT) {
      new Error(response.statusText);
      return response as any;
    }
  }

  set token(token: string) {
    this._token = token;
    headers.Authorization = `Bot ${this._token}`;
  }
}
