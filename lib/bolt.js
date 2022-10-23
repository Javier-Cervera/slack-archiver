import { App, LogLevel } from '@slack/bolt';

export default function bolt(receiver) {
  const app = new App({
    receiver,
    token: process.env.NEXT_PUBLIC_SLACK_BOT_TOKEN,
    logLevel: LogLevel.DEBUG,
  });

  app.message('hello', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`Hey there <@${message.user}>!`);
  });

  app.event('message.channels', async ({ event, say }) => {
    event.text;
    await say(event.text);
  });
}
