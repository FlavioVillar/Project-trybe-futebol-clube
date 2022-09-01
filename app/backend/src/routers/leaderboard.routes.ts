import { Router } from 'express';
// import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderboardController from '../controllers/leaderboard/2leaderboard.controller';

const router = Router();

router.get('/leaderboard', LeaderboardController.getTotalClassification);
router.get('/leaderboard/home', LeaderboardController.getHomeTeamClassification);
router.get('/leaderboard/away', LeaderboardController.getAwayTeamClassification);
// router.get('/leaderboard/away', LeaderboardController.getAwayTeamClassification);

export default router;
