import TeamsModel from '../database/models/teams.model';
import MatchesModel from '../database/models/matches.model';
import HomeTeamRaking from '../utils/homeTeamRanking';
import AwayTeamRanking from '../utils/awayTeamRanking';
import TotalRanking from '../utils/totalRanking';

export default class LeaderboardService {
  static async getHomeTeamClassification(): Promise<any> {
    const getAllMatches = await MatchesModel
      .findAll({ where: { inProgress: false }, attributes: ['homeTeam'] });

    const filterTeams = [...new Set(getAllMatches.map((item) => item.homeTeam))];

    const getFinalList = HomeTeamRaking.finalList(filterTeams);

    return getFinalList;
  }

  static async getAwayTeamClassification(): Promise<any> {
    const getAllMatches = await MatchesModel
      .findAll({ where: { inProgress: false }, attributes: ['awayTeam'] });

    const filterTeams = [...new Set(getAllMatches.map((item) => item.awayTeam))];

    const getFinalList = AwayTeamRanking.finalList(filterTeams);

    return getFinalList;
  }

  static async getTotalClassification(): Promise<any> {
    const getAllTeams = await TeamsModel.findAll({ attributes: ['id'] });

    const getFinalList = TotalRanking.finalList(getAllTeams.map((item) => item.id));

    return getFinalList;
  }
}
