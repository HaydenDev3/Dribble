import { ActivityType, Client, GatewayIntentBits } from "discord.js";
import { registerEvents } from ".";

export class ExtendedClient extends Client {
  public readonly commands = new Map<string, any>();
  public readonly aliases = new Map<string, string>();

  constructor() {
    super({
      intents: [GatewayIntentBits.Guilds],
      presence: {
        activities: [
          {
            name: `/help To spawn some help!`,
            type: ActivityType.Playing,
          },
        ],
        status: "online",
      },
    });
  }

  public async init (token: string) {
    this.login(token);
    await registerEvents(`${process.cwd()}/src`);
  }
}
