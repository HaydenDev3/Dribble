import { Client } from "../..";
import { headers } from "../../utils/GatewayPayload";
import { Constants, EndPoints, StatusCode } from "../../utils/Constants";
import { MessageOptions } from "../../utils/message/MessageOptions";
import axios from "axios";

export default class RestAPIHandler {
    private _token: string = "";

    constructor(private client: Client) {
        Object.defineProperty(this, "_token", {
            enumerable: false,
        });
    }

    async fetchGuilds() {
        const response = await axios.get(
            `${Constants.API_URL}/${EndPoints.USER_GUILDS}`,
            { headers }
        );
        return response.data();
    }

    async fetchGuild(id: string) {
        const response = await axios.get(
            `${Constants.API_URL}/${EndPoints.GUILDS}/${id}?with_counts=true`,
            { headers }
        );
        return response.data();
    }

    async fetchChannels(id: string) {
        const response = await axios.get(
            `${Constants.API_URL}/${EndPoints.GUILDS}/${id}/${EndPoints.CHANNELS}`,
            { headers }
        );
        return response.data;
    }

    async fetchChannel(id: string) {
        const response = await axios.get(
            `${Constants.API_URL}/${EndPoints.CHANNELS}/${id}`,
            { headers }
        );
        return response.data();
    }

    async fetchGuildMember(guildId: string, userId: string) {
        const response = await axios.get(
            `${Constants.API_URL}/${EndPoints.GUILDS}/${guildId}/${EndPoints.MEMBERS}/${userId}`,
            { headers }
        );
        return response.data();
    }

    async fetchGuildMembers(guildId: string, count: number) {
        const response = await axios.get(
            `${Constants.API_URL}/${EndPoints.GUILDS}/${guildId}/${EndPoints.MEMBERS}?limit=${count}`,
            { headers }
        );
        return response.data();
    }

    async fetchUser(userId: string) {
        const response = await axios.get(
            `${Constants.API_URL}/${EndPoints.USERS}/${userId}`,
            { headers }
        );
        return response.data();
    }

    async fetchMessage(channelId: string, messageId: string): Promise<any> {
        const response = await axios.get(
            `${Constants.API_URL}/${EndPoints.CHANNELS}/${channelId}/${EndPoints.MESSAGES}/${messageId}`,
            { method: "GET", headers }
        );
        return response.data();
    }

    async pinMessage(channelId: string, messageId: string): Promise<any> {
        return await axios.put(
            `${Constants.API_URL}/${EndPoints.CHANNELS}/${channelId}/${EndPoints.PINS}/${messageId}`,
            { method: "PUT", headers }
        );
    }

    async unpinMessage(channelId: string, messageId: string): Promise<any> {
        return await axios.post(
            `${Constants.API_URL}/${EndPoints.CHANNELS}/${channelId}/${EndPoints.PINS}/${messageId}`,
            { method: "DELETE", headers }
        );
    }

    async createMessage(options: MessageOptions, id: string) {
        const response = await axios.post(
            `${Constants.API_URL}/${EndPoints.CHANNELS}/${id}/${EndPoints.MESSAGES}`,
            {
                method: "POST",
                headers,
                data: JSON.stringify(options),
            }
        );
        return response.data();
    }

    async deleteMessage(channelId: string, messageId: string) {
        return await axios.post(
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
        return await axios.patch(
            `${Constants.API_URL}/${EndPoints.CHANNELS}/${channelId}/${EndPoints.MESSAGES}/${messageId}`,
            {
                method: "PATCH",
                headers,
                data: JSON.stringify(options),
            }
        );
    }

    async createReaction(
        channelId: string,
        messageId: string,
        emoji: any
    ) {
        const response = await axios.get(
            `${Constants.API_URL}/${EndPoints.CHANNELS}/${channelId}/${EndPoints.MESSAGES}/${messageId}/${EndPoints.REACTIONS}/${emoji}/@me`,
            {
                method: "PUT",
                headers,
            }
        );
        response.status ? new Error(response.statusText) : null;
        if (response.status === StatusCode.NO_CONTENT) {
            new Error(response.statusText)
            return response as any;
        }; 
    }

    set token (token: string) {
        this._token = token;
        headers.Authorization = `Bot ${this._token}`;
    }
}
