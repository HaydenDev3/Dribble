import { Client } from "../../api";

export class ExtendedClient extends Client {
    public readonly commands = new Map<string, any>();

    constructor () {
        super ();
    };
};