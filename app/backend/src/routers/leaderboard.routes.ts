import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard/leaderboard.controller';

const router = Router();

router.get('/leaderboard', LeaderboardController.getTotalRanking);
router.get('/leaderboard/home', LeaderboardController.getHomeTeamRanking);
router.get('/leaderboard/away', LeaderboardController.getAwayTeamRanking);

export default router;
