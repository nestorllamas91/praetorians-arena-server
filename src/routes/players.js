import express from 'express';
const router = express.Router();

import { getPlayers } from '$root/controllers/players';

router.get('/', getPlayers);

export default router;
