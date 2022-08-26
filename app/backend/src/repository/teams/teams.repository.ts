import TeamsModel from '../../database/models/teams.model';
import { ITeamsRepository } from './ITeamsRepository';
import Teams from '../../entities/teams/Teams';

export default class TeamsRepository implements ITeamsRepository {
  constructor(private model = TeamsModel) { }

  async getTeams(): Promise<Teams[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async getTeamById(id: string): Promise<Teams> {
    const team = await this.model.findOne({ where: { id } });
    return team as Teams;
  }
}
