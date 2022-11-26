import Role from "./GuildRole";
import GuildMember from "./GuildMember";
import { BaseChannel } from "../channels/BaseChannel";

export default class Guild {
    private _channels: Map<string, BaseChannel> = new Map();
    private _members: Map<string, GuildMember> = new Map();
    private _emojis: Map<string, any> = new Map();
    private _roles: Map<string, Role> = new Map();

    constructor(
        private _id: string,
        private _name: string,
        private _icon: string,
        private _description: string,
        private _splash: string,
        private _discoverySplash: string,
        private _features: Array<any>,
        private _banner: string,
        private _ownerId: string,
        private _applicationId: string,
        private _region: string,
        private _afkChannelId: string,
        private _afkTimeout: string,
        private _systemChannelId: string,
        private _widgetEnabled: boolean,
        private _widgetChannelId: string,
        private _verificationLevel: number,
        private _defaultMessageNotifications: number,
        private _mfaLevel: number,
        private _explicitContentFilter: number,
        private _maxPresences: number,
        private _maxMembers: number,
        private _maxVideoChannelUsers: number,
        private _vanityUrl: string,
        private _premiumTier: number,
        private _premiumSubscriptionCount: number,
        private _systemChannelFlags: number,
        private _preferredLocale: string,
        private _rulesChannelId: string,
        private _publicUpdatesChannelId: string,
        private _embedEnabled: boolean,
        private _embedChannelId: string
    ) {}

    public get roles(): Map<string, Role> {
        return this._roles;
    }
    public set roles(roles: Map<string, Role>) {
        this._roles = roles;
    }

    public get emojis(): Map<string, any> {
        return this._emojis;
    }
    public set emojis(emojis: Map<string, any>) {
        this._emojis = emojis;
    }

    public get channels(): Map<string, BaseChannel> {
        return this._channels;
    }
    public set channels(channels: Map<string, BaseChannel>) {
        this._channels = channels;
    }

    public get name() {
        return this._name;
    }
    public set name(name: string) {
        this._name = name;
    }

    public get members(): Map<string, GuildMember> {
        return this._members;
    }
    public set members(members: Map<string, GuildMember>) {
        this._members = members;
    }

    public get id(): string {
        return this._id;
    }
    public get icon(): string {
        return this._icon;
    }

    public get description(): string {
        return this._description;
    }
    public get splash(): string {
        return this._splash;
    }
}
