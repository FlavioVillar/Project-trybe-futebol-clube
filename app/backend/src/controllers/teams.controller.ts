import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/teams.service';

export default class TeamController {
  static async getTeams(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const teams = await TeamService.getTeams();
      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  static async getTeamById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const team = await TeamService.getTeamById(id);
      res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }
}
