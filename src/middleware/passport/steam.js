import passportSteam from 'passport-steam';

import Player from '$root/models/user';

async function verify(identifier, profile, done) {
  try {
    profile.identifier = identifier;
    let user = await Player.findOne({ steamId: profile._json.steamid });
    if (!user) {
      const newUser = new Player({
        steamId: profile._json.steamid,
        steamProfileUrl: profile._json.profileurl,
        steamAvatar: {
          small: profile._json.avatar,
          medium: profile._json.avatarmedium,
          big: profile._json.avatarfull
        },
        steamNickname: profile._json.personaname,
        steamRealName: profile._json.realname,
        steamCountry: profile._json.loccountrycode,
        isLoggedIn: true
      });
      newUser.save();
      user = newUser;
    } else {
      user.isLoggedIn = true;
      user.save();
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}

const options = {
  returnURL: `${process.env.API_DOMAIN}/auth/login/return`,
  realm: process.env.API_DOMAIN,
  apiKey: process.env.STEAM_API_KEY
};

export default new passportSteam.Strategy(options, verify);
