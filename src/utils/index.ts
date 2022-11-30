import { Guild } from "discord.js";
import fs from "fs";
import { client } from "../app";
import BaseCommand from "./BaseCommand";

export async function importFile(filePath: string): Promise<any> {
  return (await import(filePath))?.default;
}

export function registerCommands(mainPath: string) {
  try {
    const commandsArray: Array<BaseCommand> = [];

    fs.readdirSync(`${mainPath}/commands/`).forEach(async (dir) => {
      const commands = fs
        .readdirSync(`${mainPath}/commands/${dir}/`)
        .filter((file) => file.endsWith(".ts"));

      for (const file of commands) {
        const pull = (await importFile(
          `../commands/${dir}/${file}`
        )) as BaseCommand;
        if ( !pull?.data ) continue;

        client.commands.set(pull.data?.name as any, pull);
        commandsArray.push(pull.data);
      }
    });

    client.on('ready', () => {
      const guildId = process.env.GUILD_ID;
      let guild: Guild;

      if ( guildId ) {
        guild = client.guilds.cache.get(guildId) as Guild;

        guild.commands.set(commandsArray as any);
      } else {
        client.application?.commands.set(commandsArray as any);
      };
    })
  } catch (err: any) {
    console.log(err.stack);
  }
}

export async function registerEvents(mainPath: string) {
  try {
    fs.readdirSync(`${mainPath}/events/`)
      .filter((file) => file.endsWith(".ts"))
      .forEach(async (file) => {
        const pull = (await import(`../events/${file}`))?.default;
        if (!pull?.on) return;

        client.on(pull?.on as any, pull.invoke.bind(pull));
      });
  } catch (err: any) {
    console.log(err.stack);
  }
}
