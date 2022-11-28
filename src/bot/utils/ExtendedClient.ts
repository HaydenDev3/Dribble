import { Client, PresenceType } from "../../api";

export class ExtendedClient extends Client {
  public readonly commands = new Map<string, any>();
  public readonly aliases = new Map<string, string>();

  constructor() {
    super({
      presence: {
        activities: [
          {
            name: process.env.STATUS_MESSAGE,
            type: PresenceType.Playing,
          },
        ],
        status: "online",
        since: new Date(),
        afk: true,
      },
    });
  }
}
