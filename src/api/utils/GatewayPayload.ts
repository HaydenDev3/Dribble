export interface GatewayPayload {
    op: number;
    d: any;
    t: any;
}

export const GatewayIdentifier = {
    op: 2,
    d: {
        token: "",
        properties: {
            $os: "linux",
            $browser: "chrome",
            $device: "chrome"
        }
    }
}

export const GatewayHeartbeat = {
    op: 1,
    d: null
};