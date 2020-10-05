import express from 'express';
const router = express.Router();
import passport from 'passport';

import * as controllerUser from '$root/controllers/users';

router.get('/login', passport.authenticate('steam', { session: false }));
router.get(
  '/login/return',
  passport.authenticate('steam', { session: false, failureRedirect: '/' }),
  controllerUser.logInUser
);
router.post('/logout', passport.authenticate('jwt', { session: false }), controllerUser.logOutUser);

export default router;
