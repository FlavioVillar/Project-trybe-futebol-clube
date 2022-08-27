import { NextFunction, Request, Response } from 'express';

export interface IMatchesController {
  getMatches(req: Request, res: Response, next: NextFunction): Promise<void>;
  createMatch(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateMatch(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateMatchInProgress(req: Request, res: Response, next: NextFunction): Promise<void>;
}
