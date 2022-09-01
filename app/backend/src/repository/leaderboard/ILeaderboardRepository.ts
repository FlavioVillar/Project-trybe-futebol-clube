import Match from '../../entities/matches/Match';
import Teams from '../../entities/teams/Teams';

export default interface ILeaderboardRepository {
  getAllMatches(field: string): Promise<Match[]>;
  getMatchesByTeamId(teamId: number): Promise<Match[]>;
  getTeamsById(teamId: number): Promise<Teams[]>;
  findAllTeams(): Promise<Teams[]>;
}
