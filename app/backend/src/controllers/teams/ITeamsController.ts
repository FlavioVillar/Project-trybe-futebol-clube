import { NextFunction, Request, Response } from 'express';

export interface ITeamsController {
  getTeamById(req: Request, res: Response, next: NextFunction): Promise<void>;
  getTeams(req: Request, res: Response, next: NextFunction): Promise<void>;
}
