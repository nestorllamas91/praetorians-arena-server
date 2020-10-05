import mongoose from 'mongoose';

const Combat = mongoose.model(
  'combats',
  new mongoose.Schema(
    {
      combatId: Number,
      type: String,
      state: String,
      season: String,
      competition: String,
      rankingId: Number,
      startDate: Date,
      endDate: Date,
      opponents: { teamName1: String, teamName2: String },
      result: String,
      games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'games' }]
    },
    { timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } }
  )
);

export default Combat;
