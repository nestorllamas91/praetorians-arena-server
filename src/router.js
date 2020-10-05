import express from 'express';

import populateDatabase from '$root/populate';
import routerAuthentication from '$root/routes/users';
import routerAccount from '$root/routes/account';
import routerHome from '$root/routes/home';
import routerCompetitions from '$root/routes/competitions';
import routerGames from '$root/routes/games';
import routerPlayers from '$root/routes/players';
import routerStatistics from '$root/routes/stats';
import routerContact from '$root/routes/contact';

const router = express.Router();

router.post('/populate', populateDatabase);
router.use('/auth', routerAuthentication);
router.use('/account', routerAccount);
router.use('/home', routerHome);
router.use('/competitions', routerCompetitions);
router.use('/games', routerGames);
router.use('/players', routerPlayers);
router.use('/stats', routerStatistics);
router.use('/contact', routerContact);

export default router;
