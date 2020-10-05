import { handleResponseSuccess } from '$root/utils/handlers';
import { HandlerResponseError } from '$root/utils/handlers';

import Ranking from '$root/models/ranking';
import Combat from '$root/models/combat';

export async function getSeasons(req, res, next) {
  try {
    let seasons = [];
    const years = await Ranking.distinct('year');
    if (years.length === 0) {
      return handleResponseSuccess(res, seasons, __filename);
    }
    const seasonsPromises = years
      .sort((a, b) => b - a)
      .map(async year => {
        const rankings = await Ranking.find({ year });
        const quartersCurrentYear = rankings
          .map(ranking => ranking.quarter)
          .filter((value, index, self) => self.indexOf(value) === index)
          .sort((a, b) => a - b);
        return { [year]: { quarters: quartersCurrentYear } };
      });
    seasons = await Promise.all(seasonsPromises);
    handleResponseSuccess(res, seasons, __filename);
  } catch (err) {
    next(new HandlerResponseError(500, err, __filename));
  }
}

export async function getCompetitions(req, res, next) {
  try {
    const { season } = req.params;
    let competitions = [];
    const rankings = await Ranking.find({ season });
    if (rankings.length === 0) {
      return handleResponseSuccess(res, competitions, __filename);
    }
    competitions = rankings;
    handleResponseSuccess(res, competitions, __filename);
  } catch (err) {
    next(new HandlerResponseError(500, err, __filename));
  }
}

export async function getRankings(req, res, next) {
  try {
    const rankings = await Ranking.find({});
    handleResponseSuccess(res, rankings, __filename);
  } catch (err) {
    next(new HandlerResponseError(500, err, __filename));
  }
}

export async function getRankingFromId(req, res, next) {
  try {
    const { rankingId } = req.params;
    const ranking = await Ranking.findOne({ rankingID: rankingId });
    handleResponseSuccess(res, ranking, __filename);
  } catch (err) {
    next(new HandlerResponseError(500, err, __filename));
  }
}

export async function getRankingFromParams(req, res, next) {
  try {
    const { season, competition } = req.params;
    const ranking = await Ranking.findOne({ season, competition });
    handleResponseSuccess(res, ranking, __filename);
  } catch (err) {
    next(new HandlerResponseError(500, err, __filename));
  }
}

export async function getCombats(req, res, next) {
  try {
    const combats = await Combat.find({});
    handleResponseSuccess(res, combats, __filename);
  } catch (err) {
    next(new HandlerResponseError(500, err, __filename));
  }
}

export async function getTeamNameOfPlayer(req, res, next) {
  try {
    const { rankingId, steamId } = req.params;
    let teamName = '';
    const ranking = await Ranking.findOne({ rankingID: rankingId });
    if (ranking === null) {
      handleResponseSuccess(res, teamName, __filename);
    }
    let playerFound = false;
    ranking.data.map(row => {
      row.team.players.map(player => {
        if (player.steamId === steamId) {
          playerFound = true;
          teamName = row.team.name;
          handleResponseSuccess(res, teamName, __filename);
        }
      });
    });
    if (!playerFound) {
      teamName = null;
      handleResponseSuccess(res, teamName, __filename);
    }
  } catch (err) {
    next(new HandlerResponseError(500, err, __filename));
  }
}
