import MatchesModel from '../database/models/matches.model';
import HomeTeamRaking from '../utils/homeTeamRanking';

export default class LeaderboardService {
  static async getHomeTeamClassification(): Promise<any> {
    const getAllMatches = await MatchesModel
      .findAll({ where: { inProgress: false }, attributes: ['homeTeam'] });

    const filterTeams = [...new Set(getAllMatches.map((item) => item.homeTeam))];

    const getFinalList = HomeTeamRaking.finalList(filterTeams);

    return getFinalList;
  }
}
