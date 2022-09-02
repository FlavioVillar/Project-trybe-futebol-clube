import TeamsModel from '../../database/models/teams.model';
import { ITeamsRepository } from './ITeamsRepository';
import { ITeams } from '../../interfaces/teams/ITeams.interface';
// import Teams from '../../entities/teams/Teams';

export default class TeamsRepository implements ITeamsRepository {
  constructor(private model = TeamsModel) { }

  async getTeams(): Promise<ITeams[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async getTeamById(id: number): Promise<ITeams> {
    const team = await this.model.findOne({ where: { id } });
    return team as ITeams;
  }

  static async getTeamByAttributes(): Promise<ITeams[]> {
    const teams = await TeamsModel.findAll({ attributes: ['id', 'teamName'] });
    return teams as ITeams[];
  }
}
