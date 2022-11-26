import { Client } from "../../api";

export class ExtendedClient extends Client {
    public readonly commands = new Map<string, any>();
    public readonly aliases = new Map<string, string>();

    constructor () {
        super ({
            "presence": {
                "activities": [
                    {
                        "name": "Developed by www.unbreakable.dev",
                        "type": 0
                    }
                ],
                "status": "idle",
                "since": new Date(),
                "afk": true
            },
        });
    };
};