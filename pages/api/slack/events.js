import { challenge } from './events_handlers/_challenge';
import { message_channels } from './events_handlers/_message_channels';
import { validateSlackRequest } from './_validate';
import { signingSecret } from './_constants';

export default async function events(req, res) {
  const type = req.body.type;

  if (type === 'url_verification') {
    await challenge(req, res);
  } else if (validateSlackRequest(req, signingSecret)) {
    if (type === 'event_callback') {
      const event_type = req.body.event.type;

      switch (event_type) {
        case 'message':
          await message_channels(req, res);
          break;
        default:
          break;
      }
    } else {
      // console.log('body:', req.body);
    }
  }
}
