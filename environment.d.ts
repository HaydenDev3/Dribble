declare global {
    namespace NodeJS {
      interface ProcessEnv {
        BOT_TOKEN: string;
        MONGO_URI: string;
        READY_MESSAGE: string;
        STATUS_MESSAGE: string;
      }
    }
}

export {}