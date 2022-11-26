import { EventEmitter } from "events";
import { Client } from "../../";
import {
  MessageCollectorOptions,
  ReactionCollectorOptions,
} from "../customs/CollectorOptions";
import Collection from "../Collection";
import { Message } from "../message/Message";
import { MessageReaction } from "../message/MessageReaction";

export abstract class BaseCollector extends EventEmitter {
  private _collected:
    | Collection<string, Message>
    | Collection<string, MessageReaction> = new Collection();

  constructor(
    private _client: Client,
    private _filter: Function,
    private _options?:
      | MessageCollectorOptions
      | ReactionCollectorOptions
      | undefined
  ) {
    super();
  }

  get client(): Client {
    return this._client;
  }
  get filter(): Function {
    return this._filter;
  }
  get options():
    | MessageCollectorOptions
    | ReactionCollectorOptions
    | undefined {
    return this._options;
  }

  get collected():
    | Collection<string, Message>
    | Collection<string, MessageReaction> {
    return this._collected;
  }
}
