import Ranking from '../../utils/homeTeamRanking/2Learderboard';

export default class LeaderboardService {
  static async getHomeTeamClassification(local: string) {
    return Ranking.finalList(local);
  }

  static async getAwayTeamClassification(local: string) {
    return Ranking.finalList(local);
  }

  static async getTotalClassification() {
    return Ranking.finalList('total');
  }
}
