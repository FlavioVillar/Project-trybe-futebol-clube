import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

router.get('/leaderboard/home', LeaderboardController.getHomeTeamClassification);
router.get('/leaderboard/away', LeaderboardController.getAwayTeamClassification);

export default router;
