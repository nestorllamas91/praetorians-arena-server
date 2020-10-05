import { handleResponseSuccess } from '$root/utils/handlers';
import { HandlerResponseError } from '$root/utils/handlers';

import Player from '$root/models/user';

export async function getPlayers(req, res, next) {
  try {
    const players = await Player.find({});
    handleResponseSuccess(res, players, __filename);
  } catch (err) {
    next(new HandlerResponseError(500, err, __filename));
  }
}
