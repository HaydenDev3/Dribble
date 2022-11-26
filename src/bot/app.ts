import { config } from "dotenv";
import { Client } from "../api";
import { registerCommands, registerEvents } from "./utils";
import { ExtendedClient } from "./utils/ExtendedClient";
config({ path: '.env' });

export const client = new ExtendedClient();

registerEvents(__dirname);
registerCommands(__dirname)

client.connect(process.env.BOT_TOKEN as string);
