import { BaseCollector } from "./BaseCollector";
import { TextChannel } from "../channels/TextChannel";
import { MessageCollectorOptions } from "../customs/CollectorOptions";
import { Message } from "../message/Message";

export class MessageCollector extends BaseCollector {
  constructor(
    channel: TextChannel,
    filter: Function,
    options?: MessageCollectorOptions
  ) {
    super(channel.client, filter, options);
    this.client.on("message", this.handleCollect);
    setTimeout(() => {
      this.emit("end", this.collected);
      this.client.off("message", this.handleCollect);
      console.log("Removed Listener....");
    }, options?.time);
  }

  handleCollect = (message: Message) => {
    if (this.filter(message)) {
      this.emit("collect", message);
      this.collected.set(message.id, message);
    }
  };
}
