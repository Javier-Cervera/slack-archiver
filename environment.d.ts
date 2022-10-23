declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SLACK_SIGNING_SECRET: string;
      NEXT_PUBLIC_SLACK_BOT_TOKEN: string;
    }
  }
}

export {};
