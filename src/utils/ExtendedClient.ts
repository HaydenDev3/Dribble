import { ActivityType, ApplicationCommandDataResolvable, Client, GatewayIntentBits } from "discord.js";
import { registerEvents } from ".";
import BaseCommand from "./BaseCommand";

export class ExtendedClient extends Client {
  public readonly commands = new Map<string, BaseCommand>();
  public readonly aliases = new Map<string, string>();
  public commandsArray: Array<ApplicationCommandDataResolvable> = new Array<ApplicationCommandDataResolvable>();

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
