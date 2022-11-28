import { config } from "dotenv";
config({ path: ".env" });

import { Client } from "../api";
import { registerEvents } from "./utils";
import { ExtendedClient } from "./utils/ExtendedClient";
import mongoose from "mongoose";
import Log from "./utils/Log";

export const client = new ExtendedClient();

registerEvents(__dirname);

mongoose.connect(process.env.MONGO_URI as string, {}, (err) =>
  err ? Log.error(err) : Log.info(`Database Connection Established`, "DATABASE")
);

client.connect(process.env.BOT_TOKEN as string);
