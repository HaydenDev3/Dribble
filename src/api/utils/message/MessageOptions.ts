export interface MessageOptions {
    content?: string;
    tts?: boolean;
    embeds?: any[];
    components?: any[];
}

export interface MessageDeleteOptions {
    timeout?: number;
    reason?: string;
}
