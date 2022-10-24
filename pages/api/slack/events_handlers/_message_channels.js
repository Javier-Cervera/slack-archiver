import { postToChannel, channelIdToName, userIdToName } from '../_utils';

export async function message_channels(req, res) {
  let event = req.body;
  let date = new Date(event.event_time * 1000);
  // console.log(event);
  try {
    const channelName = await channelIdToName(event.event.channel);
    const userName = await userIdToName(event.event.user);

    await postToChannel(
      event.event.channel,
      res,
      `${userName} ${channelName} ${event.event.text} ${date.toString().slice(0, 24)}`,
    );
  } catch (e) {
    console.log(e);
  }
}
