import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  static async getMatches(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const matches = await MatchService.getMatches();
      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}
