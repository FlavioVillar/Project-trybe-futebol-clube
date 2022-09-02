import { ITeams } from '../../interfaces/teams/ITeams.interface';

export interface ITeamsRepository {
  getTeams(): Promise<ITeams[]>;
  getTeamById(id: number): Promise<ITeams>;
  getTeamByAttributes(): Promise<ITeams[]>;
}
