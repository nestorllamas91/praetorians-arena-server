import moment from 'moment';
import multer from 'multer';

import Game from '$root/models/game';
import Combat from '$root/models/combat';
import Ranking from '$root/models/ranking';

export async function getCombat(req, res) {
  const combatId = req.params.combatId;
  try {
    await Combat.findOne({ combatId }, (err, combat) => {
      res.send(combat);
    });
  } catch (err) {
    res.send('failure');
  }
}

export async function getCombats(req, res) {
  const steamId = req.params.steamId;
  let currentCombats = {};
  currentCombats.sent = [];
  currentCombats.received = [];
  let pastCombats = {};
  pastCombats.sent = [];
  pastCombats.received = [];
  try {
    await Combat.find({}, (err, combats) => {
      let counter = 0;
      if (combats.length === 0) {
        res.send({ currentCombats, pastCombats });
      }
      combats.map(async combat => {
        await Ranking.findOne({ rankingID: combat.rankingId }, (err, ranking) => {
          let playerTeamName = '';
          ranking.data.map(row => {
            row.team.players.map(player => {
              if (player.steamId === steamId) {
                playerTeamName = row.team.name;
              }
            });
          });
          if (combat.opponents.teamName1 === playerTeamName) {
            if (moment().isBefore(combat.endDate)) {
              currentCombats.sent.push(combat);
            } else {
              pastCombats.sent.push(combat);
            }
          }
          if (combat.opponents.teamName2 === playerTeamName) {
            if (moment().isBefore(combat.endDate)) {
              currentCombats.received.push(combat);
            } else {
              pastCombats.received.push(combat);
            }
          }
          counter++;
          if (counter === combats.length) {
            res.send({ currentCombats, pastCombats });
          }
        });
      });
    });
  } catch (err) {
    res.send('failure');
  }
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, './uploads');
    },
    filename: (req, file, callback) => {
      const numFiles = req.files.length;
      Game.countDocuments({}, (err, numDocuments) => {
        const id = numDocuments + numFiles;
        const filenameSystem = `${id}.sav`;
        callback(null, filenameSystem);
      });
    }
  })
}).array('files', 3);

export function uploadCombat(req, res) {
  let errorFlag = false;
  upload(req, res, err => {
    if (err) {
      errorFlag = true;
    } else {
      Game.countDocuments({}, async (err, numDocuments) => {
        const sequencesData = JSON.parse(req.body.data);
        const combatInfo = JSON.parse(req.body.info);
        await Ranking.findOne({ rankingID: combatInfo.rankingID }, async (err, ranking) => {
          let currentSequence = 1;
          let games = [];
          let counter = 0;
          let teamWinnerFound = false;
          let teamLoserFound = false;
          let playerOfTeamWinner = '';
          let playerOfTeamLoser = '';
          sequencesData.map(async sequenceData => {
            let teamsData = [];
            sequenceData.gameData.teamsData.map(teamData => {
              let playersData = [];
              let winner = 0;
              teamData.playersData.map(player => {
                let myPlayer = {
                  id: player.id,
                  steamNickname: player.steamNickname,
                  color: player.color,
                  team: player.team,
                  civilization: player.civilization,
                  kills: player.kills,
                  losses: player.losses,
                  unitsTrained: player.unitsTrained,
                  score: player.score,
                  bestScore: player.bestScore,
                  playTime: player.playTime,
                  winner: player.winner
                };
                playersData.push(myPlayer);
                if (player.winner === 1 && !teamWinnerFound) {
                  playerOfTeamWinner = player.steamNickname;
                  teamWinnerFound = true;
                }
                if (player.winner === 0 && !teamLoserFound) {
                  playerOfTeamLoser = player.steamNickname;
                  teamLoserFound = true;
                }
              });
              winner = teamData.winner;
              teamsData.push({ playersData: playersData, winner: winner });
            });
            const id = numDocuments + currentSequence;
            let game = new Game({
              arenaData: {
                season: combatInfo.season,
                competition: combatInfo.competition,
                rankingID: combatInfo.rankingID,
                combatID: combatInfo.combatID,
                gameID: id
              },
              fileData: {
                filenameSystem: `${id}.sav`,
                filenamePlayer: sequenceData.gameData.fileData.filenamePlayer,
                size: sequenceData.gameData.fileData.size,
                uploadDate: {
                  uploadFullDateISOUTC: sequenceData.gameData.fileData.uploadDate.uploadFullDateISOUTC,
                  uploadDateUTC: sequenceData.gameData.fileData.uploadDate.uploadDateUTC,
                  uploadTimeUTC: sequenceData.gameData.fileData.uploadDate.uploadTimeUTC,
                  uploadFullDateISOLocal: sequenceData.gameData.fileData.uploadDate.uploadFullDateISOLocal,
                  uploadDateLocal: sequenceData.gameData.fileData.uploadDate.uploadDateLocal,
                  uploadTimeLocal: sequenceData.gameData.fileData.uploadDate.uploadTimeLocal
                },
                uploadDate: sequenceData.gameData.fileData.uploadDate,
                uploadTime: sequenceData.gameData.fileData.uploadTime,
                uploaderPlayer: sequenceData.gameData.fileData.uploaderPlayer
              },
              gameData: {
                playDate: {
                  playFullDateISOUTC: sequenceData.gameData.gameData.playDate.playFullDateISOUTC,
                  playDateUTC: sequenceData.gameData.gameData.playDate.playDateUTC,
                  playTimeUTC: sequenceData.gameData.gameData.playDate.playTimeUTC,
                  playFullDateISOLocal: sequenceData.gameData.gameData.playDate.playFullDateISOLocal,
                  playDateLocal: sequenceData.gameData.gameData.playDate.playDateLocal,
                  playTimeLocal: sequenceData.gameData.gameData.playDate.playTimeLocal
                },
                numPlayers: sequenceData.gameData.gameData.numPlayers,
                modality: sequenceData.gameData.gameData.modality,
                map: {
                  name: sequenceData.gameData.gameData.map.name,
                  imageFilename: sequenceData.gameData.gameData.map.imageFilename
                },
                playTime: sequenceData.gameData.gameData.playTime
              },
              teamsData: teamsData
            });
            currentSequence++;
            await game
              .save()
              .then(async data => {
                counter++;
                games.push(data._id);
                if (counter === sequencesData.length) {
                  await Combat.findOne({ combatId: combatInfo.combatID }, async (err, combat) => {
                    combat.result = '2-0';
                    combat.games = games;
                    await combat.save(err => {
                      if (err) errorFlag = true;
                    });
                  });
                }
              })
              .catch(function (err) {
                console.log(err);
              });
          });

          let rankTeamWinner = -1;
          let rankTeamLoser = -1;
          teamWinnerFound = false;
          teamLoserFound = false;
          const rows = ranking.data;
          rows.map(row => {
            row.team.players.map(player => {
              if (player.steamNickname === playerOfTeamWinner && !teamWinnerFound) {
                rankTeamWinner = row.rank;
              }
              if (player === playerOfTeamLoser && !teamLoserFound) {
                rankTeamLoser = row.rank;
              }
            });
          });
          const numTeams = rows.length;
          const pointsBase = 100;
          const constantMaximizer = 3;
          const constantMinimizer = 1 / 5;
          const rankRatio = Math.abs((rankTeamWinner - rankTeamLoser) / (numTeams - 1));
          let points = -1;
          if (rankTeamWinner > rankTeamLoser) {
            points = pointsBase * (1 + (constantMaximizer - 1) * rankRatio);
          } else {
            points = pointsBase * (1 + (constantMinimizer - 1) * rankRatio);
          }
          for (let i = 0; i < ranking.data.length; i++) {
            let row = ranking.data[i];
            if (row.rank === rankTeamWinner) {
              ranking.data[i].points += points;
              ranking.data[i].victories += 1;
            }
            if (row.rank === rankTeamLoser) {
              ranking.data[i].points -= points;
              ranking.data[i].defeats += 1;
            }
          }
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

          if (errorFlag === false) {
            res.send('success');
          } else {
            res.send('failure');
          }
        });
      });
    }
  });
}
