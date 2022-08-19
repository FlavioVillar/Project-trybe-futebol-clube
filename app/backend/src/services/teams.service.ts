import TeamsModel from '../database/models/teams.model';

export default class TeamsService {
  static async getTeams(): Promise<any> {
    const teams = await TeamsModel.findAll();
    return teams;
  }

  static async getTeamById(id: string): Promise<any> {
    const team = await TeamsModel.findOne({ where: { id } });
    return team;
  }
}
