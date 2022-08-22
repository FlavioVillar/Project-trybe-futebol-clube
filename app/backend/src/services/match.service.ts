import MatchesModel from '../database/models/matches.model';
import TeamsModel from '../database/models/teams.model';

export default class MatchesService {
  static async getMatches(): Promise<any> {
    const matches = await MatchesModel.findAll({
      include: [{
        model: TeamsModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: TeamsModel,
        as: 'teamAway',
        attributes: ['teamName'],
      },
      ],
    });
    return matches;
  }

  static async getMatchesQuery(query: boolean): Promise<any> {
    const matches = await MatchesModel.findAll({
      where: { inProgress: query },
      include: [{
        model: TeamsModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: TeamsModel,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });
    return matches;
  }

  static async createMatch(
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<any> {
    const match = await MatchesModel.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true,
    });
    return match;
  }
}
