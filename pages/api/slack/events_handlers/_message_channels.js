import { channelIdToName, userInfo } from '../_utils';

export async function message_channels(req, res) {
  let event = req.body;
  let date = new Date(event.event_time * 1000);
  // console.log(event);
  try {
    const channelName = await channelIdToName(event.event.channel);
    const { userName, color } = await userInfo(event.event.user);

    await fetch(`${process.env.HOST}/api/messages`, {
      method: 'POST',
      body: JSON.stringify({
        channel: channelName,
        userName: userName,
        date: date.toString().slice(0, 24),
        text: event.event.text,
        color: color,
      }),
    });
    res.end();
  } catch (e) {
    console.log(e);
  }
}
