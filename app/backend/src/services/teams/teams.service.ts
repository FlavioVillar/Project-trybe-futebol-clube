import { ITeamsRepository } from '../../repositories/teams/ITeamsRepository';
import { ITeamsService } from './ITeamsService';
import { ITeams } from '../../interfaces/teams/ITeams.interface';

export default class TeamsService implements ITeamsService {
  constructor(private repository: ITeamsRepository) {}

  async getTeams(): Promise<ITeams[]> {
    const teams = await this.repository.getTeams();
    return teams;
  }

  async getTeamById(id: number): Promise<ITeams> {
    const team = await this.repository.getTeamById(id);
    return team;
  }
}
