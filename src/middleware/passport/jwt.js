import passportJwt from 'passport-jwt';

import Player from '$root/models/user';

async function verify({ user }, done) {
  try {
    const readUser = await Player.findOne({ steamId: user.steamId });
    if (!readUser) {
      return done(null, false);
    } else {
      return done(null, readUser);
    }
  } catch (err) {
    return done(err, false);
  }
}

const options = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

export default new passportJwt.Strategy(options, verify);
