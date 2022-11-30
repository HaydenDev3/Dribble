import { registerEvents } from ".";
import { Client, PresenceType } from "../../api";

export class ExtendedClient extends Client {
  public readonly commands = new Map<string, any>();
  public readonly aliases = new Map<string, string>();

  constructor() {
    super({
      presence: {
        activities: [
          {
            name: `/help To spawn some help!`,
            type: PresenceType.Playing,
          },
        ],
        status: "online",
        since: new Date(),
        afk: true,
      },
    });
  }

  public async init (token: string) {
    this.connect(token);
    await registerEvents(`${process.cwd()}/src/bot`);
  }
}
