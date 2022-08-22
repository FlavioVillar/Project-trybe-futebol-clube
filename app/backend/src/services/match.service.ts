import { StatusCodes } from 'http-status-codes';
import MatchesModel from '../database/models/matches.model';
import TeamsModel from '../database/models/teams.model';
import HttpException from '../validation/HttpException';

const messageUnauthorized = 'It is not possible to create a match with two equal teams';
const messageNotFound = 'There is no team with such id!';
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
      throw new HttpException(StatusCodes.UNAUTHORIZED, messageUnauthorized);
    }

    const teamHome = await TeamsModel.findOne({ where: { id: homeTeam } });
    const teamAway = await TeamsModel.findOne({ where: { id: awayTeam } });
    if (!teamHome || !teamAway) {
      throw new HttpException(StatusCodes.NOT_FOUND, messageNotFound);
    }

    const match = await MatchesModel.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });
    return match;
  }

  static async updateMatch(id: string): Promise<any> {
    const match = await MatchesModel.update({ inProgress: false }, { where: { id } });
    return match;
  }
}
