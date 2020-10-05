import { handleResponseSuccess } from '$root/utils/handlers';
import { HandlerResponseError } from '$root/utils/handlers';

import Game from '$root/models/game';

export async function getGames(req, res, next) {
  try {
    const games = await Game.find({});
    handleResponseSuccess(res, games, __filename);
  } catch (err) {
    next(new HandlerResponseError(500, err, __filename));
  }
}
