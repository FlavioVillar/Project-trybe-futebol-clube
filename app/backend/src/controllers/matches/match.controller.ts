import { NextFunction, Request, Response } from 'express';
import { IMatchesService } from '../../services/matches/IMatchService';

export default class MatchController {
  constructor(private matchService: IMatchesService) {
    this.getMatches = this.getMatches.bind(this);
    this.createMatch = this.createMatch.bind(this);
    this.updateMatch = this.updateMatch.bind(this);
    this.updateMatchInProgress = this.updateMatchInProgress.bind(this);
  }

  async getMatches(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { inProgress } = req.query;
      if (inProgress) {
        const convertInBoolean = inProgress === 'true';
        const matches = await this.matchService.getMatchesQuery(convertInBoolean);
        res.status(200).json(matches);
      } else {
        const matches = await this.matchService.getMatches();
        res.status(200).json(matches);
      }
    } catch (error) {
      next(error);
    }
  }

  async createMatch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const match = await this.matchService.createMatch(req.body);
      res.status(201).json(match);
    } catch (error) {
      next(error);
    }
  }

  async updateMatch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.matchService.updateMatch(id);
      res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  async updateMatchInProgress(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.matchService.updateMatchInProgress(id, req.body);
      res.status(200).json({ message: 'Partida atualizada' });
    } catch (error) {
      next(error);
    }
  }
}
