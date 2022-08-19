import TeamsModel from '../database/models/teams.model';

export default class TeamsService {
  static async getTeams(): Promise<any> {
    const teams = await TeamsModel.findAll();
    return teams;
  }
}
