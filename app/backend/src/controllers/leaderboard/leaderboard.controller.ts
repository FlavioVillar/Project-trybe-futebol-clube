import { Request, Response, NextFunction } from 'express';
import { ILeaderboardService } from '../../services/leaderboard/ILeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService: ILeaderboardService) {
    this.getHomeTeamRanking = this.getHomeTeamRanking.bind(this);
    this.getAwayTeamRanking = this.getAwayTeamRanking.bind(this);
    this.getTotalRanking = this.getTotalRanking.bind(this);
  }

  async getHomeTeamRanking(_req: Request, res: Response, next: NextFunction)
    : Promise<void> {
    try {
      const homeTeamRanking = await this.leaderboardService.getFieldRanking('homeTeam');
      res.status(200).json(homeTeamRanking);
    } catch (error) {
      next(error);
    }
  }

  async getAwayTeamRanking(_req: Request, res: Response, next: NextFunction)
    : Promise<void> {
    try {
      const awayTeamRanking = await this.leaderboardService.getFieldRanking('awayTeam');
      res.status(200).json(awayTeamRanking);
    } catch (error) {
      next(error);
    }
  }

  async getTotalRanking(_req: Request, res: Response, next: NextFunction)
    : Promise<void> {
    try {
      const geralRanking = await this.leaderboardService.getRanking();
      res.status(200).json(geralRanking);
    } catch (error) {
      next(error);
    }
  }
}
