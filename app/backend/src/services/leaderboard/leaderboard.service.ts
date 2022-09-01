import { ILeaderboardResult } from '../../entities/leaderboard/ILeaderboard.interface';
import TeamsRepository from '../../repositories/teams/teams.repository';
import LeaderBoard from '../../utils/leaderboard.utils';

export default class LeaderboardService {
  static async getFieldRanking(local: string): Promise<ILeaderboardResult[]> {
    const teams = await TeamsRepository.getTeamByAttributes();
    const list = await Promise.all(teams.map(async (item) => LeaderBoard.countGames(item, local)));
    const results = await LeaderBoard.sortBoard(list);
    return results;
  }

  static async getRanking(): Promise<ILeaderboardResult[]> {
    const teams = await TeamsRepository.getTeamByAttributes();
    const list = await Promise.all(teams.map(async (item) => LeaderBoard.getTotalRanking(item)));
    const results = await LeaderBoard.sortBoard(list);
    return results;
  }
}
