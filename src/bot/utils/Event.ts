import { ClientEvents } from "../../api";

export default interface Event {
  on: keyof ClientEvents | string;
  invoke: (...args: any[]) => void;
}
