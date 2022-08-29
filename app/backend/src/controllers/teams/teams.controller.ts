import { NextFunction, Request, Response } from 'express';
import { ITeamsService } from '../../services/teams/ITeamsService';

export default class TeamController {
  constructor(private teamsService: ITeamsService) {
    this.getTeamById = this.getTeamById.bind(this);
    this.getTeams = this.getTeams.bind(this);
  }

  async getTeamById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const team = await this.teamsService.getTeamById(req.params.id);
      res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }

  async getTeams(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const teams = await this.teamsService.getTeams();
      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }
}
