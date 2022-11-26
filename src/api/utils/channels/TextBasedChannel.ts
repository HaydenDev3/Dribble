import { Message } from "../message/Message";
import { MessageOptions } from "../message/MessageOptions";

export default interface TextBasedChannel {
    send(payload: string | MessageOptions): any;
}
