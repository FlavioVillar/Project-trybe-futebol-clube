import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../../services/leaderboard/2leaderboard.service';

export default class LeaderboardController {
  static async getHomeTeamClassification(req: Request, res: Response, next: NextFunction)
    : Promise<void> {
    try {
      const homeTeamClassification = await LeaderboardService.getHomeTeamClassification('homeTeam');
      res.status(200).json(homeTeamClassification);
    } catch (error) {
      next(error);
    }
  }

  static async getAwayTeamClassification(req: Request, res: Response, next: NextFunction)
    : Promise<void> {
    try {
      const homeTeamClassification = await LeaderboardService.getAwayTeamClassification('awayTeam');
      res.status(200).json(homeTeamClassification);
    } catch (error) {
      next(error);
    }
  }

  static async getTotalClassification(req: Request, res: Response, next: NextFunction)
    : Promise<void> {
    try {
      const totalClassification = await LeaderboardService.getTotalClassification();
      res.status(200).json(totalClassification);
    } catch (error) {
      next(error);
    }
  }
}
