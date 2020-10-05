import { handleResponseSuccess } from '$root/utils/handlers';
import { HandlerResponseError } from '$root/utils/handlers';

import Combat from '$root/models/combat';
import Ranking from '$root/models/ranking';

import moment from 'moment';

export async function getMyRankings(req, res, next) {
  try {
    const { steamId } = req.params;
    let myRankings = { current: [], next: [], past: [] };
    const currentYear = moment().year();
    const currentQuarter = moment().quarter();
    const currentSeason = `${currentYear}-q${currentQuarter}`;
    let nextSeason = '';
    if (currentQuarter === 4) {
      nextSeason = `${currentYear + 1}-q1`;
    } else {
      nextSeason = `${currentYear}-q${currentQuarter + 1}`;
    }
    const rankings = await Ranking.find({});
    rankings.map(ranking => {
      ranking.data.map(row => {
        row.team.players.map(player => {
          if (player.steamId === steamId) {
            if (ranking.season === currentSeason) {
              myRankings.current.push(ranking);
            } else {
              if (ranking.season === nextSeason) {
                myRankings.next.push(ranking);
              } else {
                myRankings.past.push(ranking);
              }
            }
          }
        });
      });
    });
    handleResponseSuccess(res, myRankings, __filename);
  } catch (err) {
    next(new HandlerResponseError(500, err, __filename));
  }
}

export async function createChallengeCasual(req, res) {
  const rankingId = req.params.rankingId;
  const teamName1 = req.params.teamName1;
  const teamName2 = req.params.teamName2;
  try {
    Combat.countDocuments({}, async (err, numCombats) => {
      await Ranking.findOne({ rankingID: rankingId }, async (err, ranking) => {
        let combat = new Combat({
          combatId: numCombats + 1,
          type: 'casual',
          state: 'opened',
          season: ranking.season,
          competition: ranking.competition,
          rankingId: rankingId,
          startDate: moment(),
          endDate: moment().add(3, 'hours'),
          opponents: {
            teamName1: teamName1,
            teamName2: teamName2
          },
          result: undefined,
          games: undefined
        });
        await combat.save().then(() => res.send('success'));
      });
    });
  } catch (err) {
    res.send('failure');
  }
}

export async function checkPlayerChallenged(req, res) {
  const rankingId = req.params.rankingId;
  const teamName = req.params.teamName;
  try {
    let isPlayerChallengedCasual = false;
    let isPlayerChallenged7Days = false;
    await Combat.find({ rankingId: rankingId }, (err, combats) => {
      let numChallenges7Days = 0;
      combats.map(combat => {
        if (combat.rankingId == rankingId) {
          if (combat.opponents.teamName1 === teamName || combat.opponents.teamName2 === teamName) {
            if (combat.type === 'casual') {
              if (combat.state === 'opened' || combat.state === 'opened-accepted') {
                isPlayerChallengedCasual = true;
              }
            }
            if (combat.type === '7-days') {
              numChallenges7Days++;
            }
          }
        }
      });
      if (numChallenges7Days === 3) {
        isPlayerChallenged7Days = true;
      } else {
        isPlayerChallenged7Days = false;
      }
      res.send({
        isPlayerChallengedCasual,
        isPlayerChallenged7Days
      });
    });
  } catch (err) {
    res.send('failure');
  }
}
