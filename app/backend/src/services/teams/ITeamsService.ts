import Teams from '../../entities/teams/Teams';

export interface ITeamsService {
  getTeams(): Promise<Teams[]>;
  getTeamById(id: string): Promise<Teams>;
}
