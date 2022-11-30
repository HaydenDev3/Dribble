import { ApplicationCommandDataResolvable, Guild } from "discord.js";
import fs from "fs";
import { client } from "../app";
import BaseCommand from "./BaseCommand";
import Log from "./Log";

export async function importFile(filePath: string): Promise<any> {
  return (await import(filePath))?.default;
}

export async function registerCommands(mainPath: string) {
  try {
    fs.readdirSync(`${mainPath}/commands/`).forEach(async (dir) => {
      const commands = fs.readdirSync(`${mainPath}/commands/${dir}/`)
        .filter((file) => file.endsWith(".ts")) as string[];

      for (const file of commands) {
        const pull = (await import(`../commands/${dir}/${file}`))?.default as BaseCommand;
        if ( !pull?.data ) return;

        client.commandsArray.push(pull.data as ApplicationCommandDataResolvable);
        client.commands.set(pull.data?.name as string, pull);
      }
    });
  } catch (err: any) {
    Log.error(err, 'util');
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
