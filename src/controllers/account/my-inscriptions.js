import moment from 'moment';

import Ranking from '$root/models/ranking';
import Player from '$root/models/user';

export async function getTeamProposals(req, res) {
  const steamId = req.params.steamId;
  const currentYear = moment().year();
  const currentQuarter = moment().quarter();
  const currentSeason = `${currentYear}-q${currentQuarter}`;
  const nextSeason = currentQuarter < 4 ? `${currentYear}-q${currentQuarter + 1}` : `${currentYear + 1}-q1`;
  let currentTeamProposals = {};
  currentTeamProposals.sent = [];
  currentTeamProposals.received = [];
  let nextTeamProposals = {};
  nextTeamProposals.sent = [];
  nextTeamProposals.received = [];
  let pastTeamProposals = {};
  pastTeamProposals.sent = [];
  pastTeamProposals.received = [];
  try {
    await Ranking.find({}, (err, rankings) => {
      rankings.map(ranking => {
        ranking.data.map(row => {
          row.team.players.map((player, index) => {
            if (player.steamId === steamId) {
              if (ranking.season === currentSeason) {
                if (index === 0) {
                  currentTeamProposals.sent.push(ranking);
                } else {
                  currentTeamProposals.received.push(ranking);
                }
              } else {
                if (ranking.season === nextSeason) {
                  if (index === 0) {
                    nextTeamProposals.sent.push(ranking);
                  } else {
                    nextTeamProposals.received.push(ranking);
                  }
                } else {
                  if (index === 0) {
                    pastTeamProposals.sent.push(ranking);
                  } else {
                    pastTeamProposals.received.push(ranking);
                  }
                }
              }
            }
          });
        });
      });
    });
    res.send({
      currentTeamProposals,
      nextTeamProposals,
      pastTeamProposals
    });
  } catch (err) {
    res.send('failure');
  }
}

export async function getOpenRankings(req, res) {
  let openCurrentRankings = [];
  let openNextRankings = [];
  try {
    await Ranking.find({ state: { $in: ['playing', 'inscription'] } }, (err, rankings) => {
      rankings.map(ranking => {
        const { state } = ranking;
        if (state === 'playing') {
          openCurrentRankings.push(ranking);
        } else {
          openNextRankings.push(ranking);
        }
      });
    });
    res.send({ openCurrentRankings, openNextRankings });
  } catch (err) {
    res.send('failure');
  }
}

export async function checkPlayerInRanking(req, res) {
  const rankingID = req.params.rankingID;
  const steamId = req.params.steamId;
  try {
    let isPlayerInRanking = false;
    await Player.findOne({ steamId }, async (err, player) => {
      await Ranking.findOne({ rankingID }, (err, ranking) => {
        ranking.data.map(row => {
          row.team.players.map(myPlayer => {
            if (
              myPlayer.steamNickname === player.steamNickname &&
              (row.enrollmentState === 'pending' || row.enrollmentState === 'accepted')
            ) {
              isPlayerInRanking = true;
            }
          });
        });
        res.send(isPlayerInRanking);
      });
    });
  } catch (err) {
    res.send('failure');
  }
}

export async function checkRankingMaxPlayers(req, res) {
  const rankingID = req.params.rankingID;
  try {
    let numPlayers = 0;
    await Ranking.findOne({ rankingID }, (err, ranking) => {
      ranking.data.map(row => {
        if (row.enrollmentState === 'accepted') {
          numPlayers += ranking.numPlayersPerGame / 2;
        }
      });
      let isRankingMaxPlayers = false;
      const typeCompetition = ranking.competition.split('-')[0];
      const modeCompetition = ranking.competition.split('-')[1];
      if (typeCompetition === 'tournament') {
        switch (modeCompetition) {
          case '1vs1':
            if (numPlayers === 32) isRankingMaxPlayers = true;
            break;
          case '2vs2':
            if (numPlayers === 32) isRankingMaxPlayers = true;
            break;
          case '3vs3':
            if (numPlayers === 24) isRankingMaxPlayers = true;
            break;
          case '4vs4':
            if (numPlayers === 32) isRankingMaxPlayers = true;
        }
      }
      res.send(isRankingMaxPlayers);
    });
  } catch (err) {
    res.send('failure');
  }
}

export async function addPlayerToRanking(req, res) {
  const rankingID = req.params.rankingID;
  const steamId = req.params.steamId;
  try {
    await Player.findOne({ steamId }, async (err, player) => {
      const myPlayer = {
        rank: undefined,
        team: {
          name: player.steamNickname,
          players: [
            {
              steamId: steamId,
              steamNickname: player.steamNickname,
              enrollmentState: 'accepted'
            }
          ]
        },
        points: 0,
        victories: 0,
        defeats: 0,
        enrollmentState: 'accepted'
      };
      await Ranking.findOne({ rankingID }, async (err, ranking) => {
        ranking.data.push(myPlayer);
        function compare(rowA, rowB) {
          if (rowA.points > rowB.points) {
            return -1;
          }
          if (rowB.points < rowB.points) {
            return 1;
          }
          return 0;
        }
        ranking.data.sort(compare);
        for (let i = 0; i < ranking.data.length; i++) {
          ranking.data[i].rank = i + 1;
        }
        await ranking.save().catch(function (err) {
          console.log(err);
        });
      });
    });
    res.send('success');
  } catch (err) {
    res.send('failure');
  }
}

export async function sendTeamProposal(req, res) {
  const rankingID = req.params.rankingID;
  const teamName = req.params.teamName;
  const players = JSON.parse(req.params.players);
  const nickname = req.params.nickname;
  try {
    await Ranking.findOne({ rankingID }, async (err, ranking) => {
      let myPlayers = [];
      players.map(player => {
        if (player.steamNickname === nickname) {
          myPlayers.push({
            steamId: player.steamId,
            steamNickname: player.steamNickname,
            enrollmentState: 'accepted'
          });
        } else {
          myPlayers.push({
            steamId: player.steamId,
            steamNickname: player.steamNickname,
            enrollmentState: 'pending'
          });
        }
      });
      const team = {
        rank: undefined,
        team: {
          name: teamName,
          players: myPlayers
        },
        points: 0,
        victories: 0,
        defeats: 0,
        enrollmentState: 'pending'
      };
      ranking.data.push(team);
      await ranking.save().catch(function (err) {
        console.log(err);
      });
    });
    res.send('success');
  } catch (err) {
    res.send('failure');
  }
}

export async function cancelTeamProposal(req, res) {
  const rankingID = req.params.rankingID;
  const steamNickname = req.params.steamNickname;
  try {
    await Ranking.findOne({ rankingID }, async (err, ranking) => {
      ranking.data.map(row => {
        if (row.enrollmentState === 'pending') {
          row.team.players.map(player => {
            if (player.steamNickname === steamNickname) {
              player.enrollmentState = 'canceled';
              row.enrollmentState = 'canceled';
            }
          });
        }
      });
      await ranking.save().catch(function (err) {
        console.log(err);
      });
    });
    res.send('success');
  } catch (err) {
    res.send('failure');
  }
}

export async function acceptTeamProposal(req, res) {
  const rankingID = req.params.rankingID;
  const steamNickname = req.params.steamNickname;
  try {
    await Ranking.findOne({ rankingID }, async (err, ranking) => {
      ranking.data.map(row => {
        if (row.enrollmentState === 'pending') {
          let enrollmentState = 'accepted';
          row.team.players.map(player => {
            if (player.steamNickname === steamNickname) {
              player.enrollmentState = 'accepted';
            }
            if (player.enrollmentState === 'pending') {
              enrollmentState = 'pending';
            }
          });
          row.enrollmentState = enrollmentState;
        }
      });
      await ranking.save().catch(function (err) {
        console.log(err);
      });
    });
    res.send('success');
  } catch (err) {
    res.send('failure');
  }
}

export async function refuseTeamProposal(req, res) {
  const rankingID = req.params.rankingID;
  const steamNickname = req.params.steamNickname;
  try {
    await Ranking.findOne({ rankingID }, async (err, ranking) => {
      ranking.data.map(row => {
        if (row.enrollmentState === 'pending') {
          row.team.players.map(player => {
            if (player.steamNickname === steamNickname) {
              player.enrollmentState = 'refused';
              row.enrollmentState = 'refused';
            }
          });
        }
      });
      await ranking.save().catch(function (err) {
        console.log(err);
      });
    });
    res.send('success');
  } catch (err) {
    res.send('failure');
  }
}
