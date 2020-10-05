import mongoose from 'mongoose';

const Game = mongoose.model(
  'games',
  new mongoose.Schema(
    {
      arenaData: {
        season: String,
        competition: String,
        rankingID: Number,
        combatID: Number,
        gameID: Number
      },
      fileData: {
        filenameSystem: String,
        filenamePlayer: String,
        size: String,
        uploadDate: {
          uploadFullDateISOUTC: String,
          uploadDateUTC: String,
          uploadTimeUTC: String,
          uploadFullDateISOLocal: String,
          uploadDateLocal: String,
          uploadTimeLocal: String
        },
        uploaderPlayer: String
      },
      gameData: {
        playDate: {
          playFullDateISOUTC: String,
          playDateUTC: String,
          playTimeUTC: String,
          playFullDateISOLocal: String,
          playDateLocal: String,
          playTimeLocal: String
        },
        numPlayers: Number,
        modality: String,
        map: { name: String, imageFilename: String },
        playTime: String
      },
      teamsData: [
        {
          playersData: [
            {
              steamNickname: String,
              color: Number,
              team: Number,
              civilization: String,
              kills: Number,
              losses: Number,
              unitsTrained: Number,
              score: Number,
              bestScore: Boolean,
              playTime: String,
              winner: Number
            }
          ],
          winner: Boolean
        }
      ]
    },
    { timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } }
  )
);

export default Game;
