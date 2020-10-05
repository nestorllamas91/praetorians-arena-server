import { handleResponseSuccess } from '$root/utils/handlers';
import { HandlerResponseError } from '$root/utils/handlers';

import Ranking from '$root/models/ranking';

export async function getRankingsByCategory(req, res, next) {
  try {
    let getRankingsByCategory = {
      inscription: [],
      playing: [],
      closed: [],
      canceled: []
    };
    const rankings = await Ranking.find({});
    if (rankings.length === 0) {
      return handleResponseSuccess(res, getRankingsByCategory, __filename);
    }
    rankings.map(ranking => {
      switch (ranking.state) {
        case 'inscription':
          getRankingsByCategory.inscription.push(ranking);
          break;
        case 'playing':
          getRankingsByCategory.playing.push(ranking);
          break;
        case 'closed':
          getRankingsByCategory.closed.push(ranking);
          break;
        case 'canceled':
          getRankingsByCategory.canceled.push(ranking);
      }
    });
    handleResponseSuccess(res, getRankingsByCategory, __filename);
  } catch (err) {
    next(new HandlerResponseError(500, err, __filename));
  }
}

export async function updateStateOfRanking(req, res, next) {
  try {
    const { rankingId, state } = req.params;
    const ranking = await Ranking.findOne({ rankingId });
    if (rankings === null) {
      return handleResponseSuccess(res, null, __filename);
    }
    ranking.state = state;
    await ranking.save();
    handleResponseSuccess(res, null, __filename);
  } catch (err) {
    next(new HandlerResponseError(500, err, __filename));
  }
}
