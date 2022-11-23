import { config } from "dotenv";
import { Client } from "../api";
import { registerCommands, registerEvents } from "./utils";
import { ExtendedClient } from "./utils/ExtendedClient";
config({ path: '.env' });

export const client = new ExtendedClient();

client.on('ready', async () => {
    console.log("Bot is ready!");

    registerCommands(__dirname);
    await registerEvents(__dirname);
})

client.connect(process.env.BOT_TOKEN as string)