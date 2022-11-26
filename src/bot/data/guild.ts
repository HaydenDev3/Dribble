import { Document, model, Schema } from "mongoose";

export interface GuildDocument extends Document {
    _id: string;
    prefix: string;
}

export const SavedGuild = model<GuildDocument>("guild", new Schema({
    _id: String,
    prefix: { 
        type: String, 
        default: "!" // you can set to anything.
    },
    // add more settings... Types: Array, String, Object, Date, Boolean.
}))