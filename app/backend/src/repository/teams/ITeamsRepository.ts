import Teams from '../../entities/teams/Teams';

export interface ITeamsRepository {
  getTeams(): Promise<Teams[]>;
  getTeamById(id: string): Promise<Teams>;
}
