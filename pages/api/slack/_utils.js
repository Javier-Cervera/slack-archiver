import { token } from './_constants';

export async function postToChannel(channelId, res, payload) {
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
}

export async function userInfo(userId) {
  const encodedUser = `${encodeURIComponent('user')}=${encodeURIComponent(userId)}`;

  try {
    const url = 'https://slack.com/api/users.info';
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      body: encodedUser,
    });
    const data = await response.json();
    // console.log(data);
    return { userName: data.user?.real_name, color: data.user?.color };
  } catch (err) {
    console.log('fetch Error:', err);
  }
}
