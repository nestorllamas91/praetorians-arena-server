import mongoose from 'mongoose';

const Ranking = mongoose.model(
  'rankings',
  new mongoose.Schema(
    {
      rankingID: Number,
      state: String,
      startDate: Date,
      endDate: Date,
      year: Number,
      quarter: Number,
      season: String,
      competition: String,
      numPlayersPerGame: Number,
      data: [
        {
          rank: Number,
          team: {
            name: String,
            players: [{ steamId: String, steamNickname: String, enrollmentState: String }]
          },
          points: Number,
          victories: Number,
          defeats: Number,
          enrollmentState: String
        }
      ]
    },
    { timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } }
  )
);

export default Ranking;
