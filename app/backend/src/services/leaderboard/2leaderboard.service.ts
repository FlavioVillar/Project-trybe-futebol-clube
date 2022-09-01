// import Ranking from '../../utils/homeTeamRanking/2Learderboard';
import Ranking2 from '../../utils/homeTeamRanking/totalRanking';

export default class LeaderboardService {
  static async getHomeTeamClassification(local: string) {
    return Ranking2.finalList(local);
  }

  static async getAwayTeamClassification(local: string) {
    return Ranking2.finalList(local);
  }

  static async getTotalClassification() {
    return Ranking2.finalList('total');
  }
}
