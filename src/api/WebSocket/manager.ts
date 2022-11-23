import EventEmitter from "events";
import WebSocket from "ws";
import { Client } from "..";
import { Constants } from "../utils/Constants";
import { GatewayHeartbeat, GatewayIdentifier, GatewayPayload } from "../utils/GatewayPayload";

export default class WebSocketManager extends EventEmitter {
    public token!: string;
    private websocket: WebSocket;
    protected payload: GatewayPayload;
    protected interval: any;

    constructor (private client: Client) {
        super();
        this.websocket = new WebSocket(Constants.GATEWAY_URL);
        return this;
    };

    public async connect (token: string) {
        try {
            this.payload = {
                op: 2,
                d: {
                    token: token,
                    intents: 14023,
                    properties: {
                        $os: "linux",
                        $browser: "ajaJS",
                        $device: "ajaJS"
                    }
                }
            } as GatewayPayload;

            this.websocket.on('open', () => {
                this.websocket.send(JSON.stringify(this.payload));
            });

            this.websocket.on('message', async (data: any) => {
                let payload = JSON.parse(data);
                const { t: event, op, d } = payload;
                switch (op) {
                    case '10':
                        this.interval = this.sendHeartbeat(d?.heartbeat_interval);
                        await this.IdentifyUser(token);
                    break;
                    case '9':
                        console.error(`Invaild token provided, or failed to connect to gateway due to intents not being recieved.`, 'Discord Api Error');
                    break;
                };

                if ( event && d ) {
                    const module = (await import(`../handlers/${event}.ts`))?.default;
                    module(this.client, payload)
                };
            })

            return this.websocket;
        } catch (err: any) {
            console.log(err.stack)
        }
    };

    private sendHeartbeat (ms: number) {
        return setInterval(() => {
            this.websocket.send(JSON.stringify(GatewayHeartbeat));
        }, ms);
    };

    private async IdentifyUser (token: string) {
        GatewayIdentifier.d.token = token;
        return this.websocket.send(JSON.stringify(GatewayIdentifier))
    };
}