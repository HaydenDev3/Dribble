import { ClientEvents } from "../../api";
import Event from "../utils/Event";
import Log from "../utils/Log";

export default new class ReadyHandler implements Event {
    on: keyof ClientEvents = "ready";

    async invoke () {
        Log.info(`Hello world, a discord api handler made with love.\nTechnologies used:\n\b1. TypeScript\n\b2. Websockets`);
    };
}