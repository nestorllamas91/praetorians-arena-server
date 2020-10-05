import mongoose from 'mongoose';

const Player = mongoose.model(
  'players',
  new mongoose.Schema(
    {
      steamId: String,
      steamProfileUrl: String,
      steamAvatar: { small: String, medium: String, big: String },
      steamNickname: String,
      steamRealName: String,
      steamCountry: String,
      isLoggedIn: Boolean
    },
    { timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } }
  )
);

export default Player;
