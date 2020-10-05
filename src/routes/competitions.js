import express from 'express';
const router = express.Router();

import { getSeasons } from '$root/controllers/competitions';
import { getCompetitions } from '$root/controllers/competitions';
import { getRankings } from '$root/controllers/competitions';
import { getRankingFromId } from '$root/controllers/competitions';
import { getRankingFromParams } from '$root/controllers/competitions';
import { getCombats } from '$root/controllers/competitions';
import { getTeamNameOfPlayer } from '$root/controllers/competitions';

router.get('/seasons', getSeasons);
router.get('/competitions/:season', getCompetitions);
router.get('/rankings', getRankings);
router.get('/ranking/:rankingId', getRankingFromId);
router.get('/ranking/:season/:competition', getRankingFromParams);
router.get('/combats', getCombats);
router.get('/team-of-player/:rankingId/:steamId', getTeamNameOfPlayer);

export default router;
