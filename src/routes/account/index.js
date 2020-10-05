import express from 'express';
const router = express.Router();

import ProfileRouter from '$root/routes/account/profile';
import NotificationsRouter from '$root/routes/account/notifications';
import MyInscriptionsRouter from '$root/routes/account/my-inscriptions';
import MyRankingsRouter from '$root/routes/account/my-rankings';
import MyCombatsRouter from '$root/routes/account/my-combats';
import RankingsStateRouter from '$root/routes/account/rankings-state';

router.use('/profile', ProfileRouter);
router.use('/notifications', NotificationsRouter);
router.use('/my-inscriptions', MyInscriptionsRouter);
router.use('/my-rankings', MyRankingsRouter);
router.use('/my-combats', MyCombatsRouter);
router.use('/rankings-state', RankingsStateRouter);

export default router;
