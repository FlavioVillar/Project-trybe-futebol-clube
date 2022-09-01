import Match from '../../entities/matches/Match';
import { ITeams } from '../../interfaces/teams/ITeams.interface';

export default interface ILeaderboardRepository {
  getAllMatches(field: string): Promise<Match[]>;
  getMatchesByTeamId(teamId: number): Promise<Match[]>;
  getTeamsById(teamId: number): Promise<ITeams[]>;
  findAllTeams(): Promise<ITeams[]>;
}
