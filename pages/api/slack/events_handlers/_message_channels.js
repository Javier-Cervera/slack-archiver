import { postToChannel, channelIdToName } from '../_utils';

export async function message_channels(req, res) {
  let event = req.body;
  let date = new Date(event.event_time * 1000);
  console.log(event);
  try {
    const channelName = await channelIdToName(event.event.channel);

    await postToChannel(
      event.event.channel,
      res,
      `<@${event.event.user}> ${channelName} ${event.event.text} ${date.toString().slice(0, 24)}`,
    );
  } catch (e) {
    console.log(e);
  }
}
