import { Client } from "../../";
import Emoji from "../Emoji";
import Collection from "../Collection";
import User from "../User/User";
import { Message } from "./Message";

export class MessageReaction {
    constructor(
        private _client: Client,
        private _emoji: Emoji,
        private _message: Message,
        private _me: boolean,
        private _users: Collection<string, User>
    ) {}

    fetch() {}
    remove() {}

    get count(): Client {
        return this._client;
    }
    get emoji(): Emoji {
        return this._emoji;
    }
    get message(): Message {
        return this._message;
    }
    get me(): boolean {
        return this._me;
    }
    get users(): Collection<string, User> {
        return this._users;
    }
}
