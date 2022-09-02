import { ITeams } from '../../interfaces/teams/ITeams.interface';
import { IMatch } from '../../interfaces/matches/IMatch.interface';

export default interface ILeaderboardRepository {
  getAllMatches(field: string): Promise<IMatch[]>;
  getMatchesByTeamId(teamId: number): Promise<IMatch[]>;
  getTeamsById(teamId: number): Promise<ITeams[]>;
  findAllTeams(): Promise<ITeams[]>;
}
