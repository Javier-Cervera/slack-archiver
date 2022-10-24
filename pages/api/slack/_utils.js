import fetch from 'node-fetch';
import { token } from './_constants';

export async function postToChannel(channelId, res, payload) {
  console.log('ID:', channelId);

  const message = {
    channel: channelId,
    text: payload,
  };

  try {
    const url = 'https://slack.com/api/chat.postMessage';
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(message),
    });
    const data = await response.json();

    console.log('data from fetch:', data);
    res.json({ ok: true });
  } catch (err) {
    console.log('fetch Error:', err);
    res.send({
      response_type: 'ephemeral',
      text: `${err}`,
    });
  }
}

export async function channelIdToName(channelId) {
  try {
    const url = 'https://slack.com/api/conversations.list';
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    return data.channels.find((channel) => channel.id === channelId)?.name;
  } catch (err) {
    console.log('fetch Error:', err);
  }
  return id;
}
