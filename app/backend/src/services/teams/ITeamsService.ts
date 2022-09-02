import { ITeams } from '../../interfaces/teams/ITeams.interface';

export interface ITeamsService {
  getTeams(): Promise<ITeams[]>;
  getTeamById(id: number): Promise<ITeams>;
}
