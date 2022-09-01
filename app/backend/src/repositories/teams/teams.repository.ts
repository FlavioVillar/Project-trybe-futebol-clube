import TeamsModel from '../../database/models/teams.model';
import { ITeamsRepository } from './ITeamsRepository';
import { ITeams } from '../../entities/teams/ITeams.interface';
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

  static async getTeamByAttributes(): Promise<ITeams[]> {
    const teams = await TeamsModel.findAll({ attributes: ['id', 'teamName'] });
    return teams as ITeams[];
  }
}
