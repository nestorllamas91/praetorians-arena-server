import { handleResponseSuccess } from '$root/utils/handlers';
import { HandlerResponseError } from '$root/utils/handlers';

import jwt from 'jsonwebtoken';

export function logInUser(req, res, next) {
  console.log(req.user);
  console.log(...req.user);
  try {
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET);
    res.cookie('user_session', token);
    res.redirect('/');
  } catch (err) {
    next(new HandlerResponseError(500, err, __filename));
  }
}

export async function logOutUser(req, res, next) {
  try {
    const requestedUserByToken = req.user;
    if (requestedUserByToken) {
      requestedUserByToken.isLoggedIn = false;
      const loggedOutUser = await requestedUserByToken.save();
      handleResponseSuccess(res, loggedOutUser, __filename);
    } else {
      return next(new HandlerResponseError(404, undefined, __filename));
    }
  } catch (err) {
    next(new HandlerResponseError(500, err, __filename));
  }
}
