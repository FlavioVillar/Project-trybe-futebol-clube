import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  static async getHomeTeamClassification(req: Request, res: Response, next: NextFunction)
    : Promise<void> {
    try {
      const homeTeamClassification = await LeaderboardService.getHomeTeamClassification();
      res.status(200).json(homeTeamClassification);
    } catch (error) {
      next(error);
    }
  }

  static async getAwayTeamClassification(req: Request, res: Response, next: NextFunction)
    : Promise<void> {
    try {
      const awayTeamClassification = await LeaderboardService.getAwayTeamClassification();
      res.status(200).json(awayTeamClassification);
    } catch (error) {
      next(error);
    }
  }
}
