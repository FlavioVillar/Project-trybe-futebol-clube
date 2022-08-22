import { StatusCodes } from 'http-status-codes';
import MatchesModel from '../database/models/matches.model';
import TeamsModel from '../database/models/teams.model';
import HttpException from '../validation/HttpException';

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
    if (homeTeam === awayTeam) {
      throw new HttpException(
        StatusCodes.UNAUTHORIZED,
        'It is not possible to create a match with two equal teams',
      );
    }
    const match = await MatchesModel.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true,
    });
    return match;
  }

  static async updateMatch(id: string): Promise<any> {
    const match = await MatchesModel.update({ inProgress: false }, { where: { id } });
    return match;
  }
}
