import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../../services/leaderboard/leaderboard.service';

export default class LeaderboardController {
  static async getHomeTeamRanking(_req: Request, res: Response, next: NextFunction)
    : Promise<void> {
    try {
      const homeTeamRanking = await LeaderboardService.getFieldRanking('homeTeam');
      res.status(200).json(homeTeamRanking);
    } catch (error) {
      next(error);
    }
  }

  static async getAwayTeamRanking(_req: Request, res: Response, next: NextFunction)
    : Promise<void> {
    try {
      const awayTeamRanking = await LeaderboardService.getFieldRanking('awayTeam');
      res.status(200).json(awayTeamRanking);
    } catch (error) {
      next(error);
    }
  }

  static async getTotalRanking(_req: Request, res: Response, next: NextFunction)
    : Promise<void> {
    try {
      const geralRanking = await LeaderboardService.getRanking();
      res.status(200).json(geralRanking);
    } catch (error) {
      next(error);
    }
  }
}
