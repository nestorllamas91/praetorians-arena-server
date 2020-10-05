import * as rankingsData from '$root/populate/rankings';
import { handleResponseSuccess, HandlerResponseError } from '$root/utils/handlers';

export default async function populateDatabase(req, res, next) {
  try {
    const populatedRankings = await Promise.all(Object.values(rankingsData).map(user => user.save()));
    const populatedDatabase = { populatedRankings };
    return handleResponseSuccess(res, populatedDatabase, __filename);
  } catch (err) {
    return next(new HandlerResponseError(500, err, __filename));
  }
}
