import { ClientEvents } from "discord.js";

export default interface Event {
  on: keyof ClientEvents | string;
  invoke: (...args: any[]) => void;
}
