declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SLACK_SIGNING_SECRET: string;
      SLACK_BOT_TOKEN: string;
    }
  }
}

export {};
