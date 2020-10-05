import express from 'express';
const router = express.Router();

import { getGames } from '$root/controllers/games';

router.get('/', getGames);

export default router;
