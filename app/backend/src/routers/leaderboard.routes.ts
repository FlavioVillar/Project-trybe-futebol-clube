import { Router } from 'express';
import Leaderboard from '../factories/Leaderboard.factory';

const router = Router();

router.get('/leaderboard', Leaderboard.controller().getTotalRanking);
router.get('/leaderboard/home', Leaderboard.controller().getHomeTeamRanking);
router.get('/leaderboard/away', Leaderboard.controller().getAwayTeamRanking);

export default router;
