import { ITeamsRepository } from '../../repositories/teams/ITeamsRepository';
import Teams from '../../entities/teams/Teams';
import { ITeamsService } from './ITeamsService';

export default class TeamsService implements ITeamsService {
  constructor(private repository: ITeamsRepository) {}

  async getTeams(): Promise<Teams[]> {
    const teams = await this.repository.getTeams();
    return teams;
  }

  async getTeamById(id: string): Promise<Teams> {
    const team = await this.repository.getTeamById(id);
    return team;
  }
}
