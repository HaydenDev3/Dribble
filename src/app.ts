import { config } from "dotenv";
config({ path: ".env" });

import { ExtendedClient } from "./utils/ExtendedClient";
import mongoose from "mongoose";
import Log from "./utils/Log";

export const client = new ExtendedClient();

if ( process.env.MONGO_URI ) {
  mongoose.connect(process.env.MONGO_URI as string, {}, (err) =>
    err ? Log.error(err) : Log.info(`Database Connection Established`, "DATABASE")
  );
} else {
  Log.error(`A missing mongoose connection URI could led to the bot breaking.`)
}

client.init(process.env.BOT_TOKEN as string);