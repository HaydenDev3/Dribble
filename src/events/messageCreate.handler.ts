import { ClientEvents, Message } from "discord.js";
import { client } from "../app";
import { SavedGuild } from "../data/guild";
import { CommandContext } from "../utils/BaseCommand";
import Event from "../utils/Event";

export default new (class MessageEvent implements Event {
  on: keyof ClientEvents = "messageCreate";

  async invoke(message: Message) {
    if ( message.author.bot || !message.guild ) return;

    const savedGuild =
      (await SavedGuild.findOne({ _id: message.guild?.id })) ||
      new SavedGuild({ _id: message.guild?.id });
    const args = message.content
      .slice(savedGuild.prefix.length)
      .trim()
      .split(/ + /g);
    const cmd = args.shift()?.toLowerCase() as string;

    const command = client.commands.get(
      cmd || (client.aliases.get(cmd) as string)
    );
    if (!command) return;
    console.log(command);

    const ctx = new CommandContext(message);
    await command.execute(ctx, ...args);
  }
})();
