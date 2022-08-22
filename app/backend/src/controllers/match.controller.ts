import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  static async getMatches(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { inProgress } = req.query;
      if (inProgress) {
        const convertInBoolean = inProgress === 'true';
        const matches = await MatchService.getMatchesQuery(convertInBoolean);
        res.status(200).json(matches);
      } else {
        const matches = await MatchService.getMatches();
        res.status(200).json(matches);
      }
    } catch (error) {
      next(error);
    }
  }

  static async createMatch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
      const match = await MatchService.createMatch(
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
      );
      res.status(201).json(match);
    } catch (error) {
      next(error);
    }
  }

  static async updateMatch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      // const { homeTeamGoals, awayTeamGoals } = req.body;
      await MatchService.updateMatch(id);
      res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }
}
