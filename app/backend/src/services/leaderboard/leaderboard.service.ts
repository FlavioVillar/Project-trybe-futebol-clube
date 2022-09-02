import { ILeaderboardResult, IField } from '../../interfaces/leaderboard/ILeaderboard.interface';
// import { ILeaderboardService } from './ILeaderboardService';
import LeaderBoard from '../../utils/leaderboard.utils';
import { ITeamsRepository } from '../../repositories/teams/ITeamsRepository';

export default class LeaderboardService {
  constructor(
    private teamsRepository: ITeamsRepository,
    private leaderboard: LeaderBoard,
  ) {}

  async getFieldRanking(local: IField): Promise<ILeaderboardResult[]> {
    const teams = await this.teamsRepository.getTeamByAttributes();
    const list = await Promise.all(teams
      .map(async (item) => this.leaderboard.countGames(item, local)));
    const results = await LeaderBoard.sortBoard(list);
    return results;
  }

  async getRanking(): Promise < ILeaderboardResult[] > {
    const teams = await this.teamsRepository.getTeamByAttributes();
    const list = await Promise.all(teams
      .map(async (item) => this.leaderboard.getTotalRanking(item)));
    const results = await LeaderBoard.sortBoard(list);
    return results;
  }
}
