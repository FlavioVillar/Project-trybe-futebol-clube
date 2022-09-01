import { StatusCodes } from 'http-status-codes';
import HttpException from '../../validation/HttpException';
import MatchesModel from '../../database/models/matches.model';
import TeamsModel from '../../database/models/teams.model';
import { IMatchesRepository } from './IMatchesRepository';
import Match from '../../entities/matches/Match';
import { IMatchCreate } from '../../entities/matches/IMatch.interface';

const messageUnauthorized = 'It is not possible to create a match with two equal teams';
const messageNotFound = 'There is no team with such id!';

export default class MatchesRepository implements IMatchesRepository {
  constructor(
    private matchesModel = MatchesModel,
    private teamsModel = TeamsModel,
  ) { }

  async getMatches(): Promise<Match[]> {
    const matches = await this.matchesModel.findAll({
      include: [{
        model: this.teamsModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: this.teamsModel,
        as: 'teamAway',
        attributes: ['teamName'],
      },
      ],
    });
    return matches;
  }

  async createMatch(id: IMatchCreate): Promise<Match> {
    if (id.homeTeam === id.awayTeam) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, messageUnauthorized);
    }

    const teamHome = await this.teamsModel.findOne({ where: { id: id.homeTeam } });
    const teamAway = await TeamsModel.findOne({ where: { id: id.awayTeam } });
    if (!teamHome || !teamAway) {
      throw new HttpException(StatusCodes.NOT_FOUND, messageNotFound);
    }

    const match = await this.matchesModel.create({
      homeTeam: id.homeTeam,
      awayTeam: id.awayTeam,
      homeTeamGoals: id.homeTeamGoals,
      awayTeamGoals: id.awayTeamGoals,
      inProgress: true,
    });

    return match;
  }

  async updateMatch(match: string): Promise<void> {
    await this.matchesModel.update({ inProgress: false }, { where: { id: match } });
  }

  async updateMatchInProgress(matchId: string, goals: Match): Promise<void> {
    await this.matchesModel
      .update({
        homeTeamGoals: goals.homeTeamGoals,
        awayTeamGoals: goals.awayTeamGoals,
        inProgress: true,
      }, { where: { id: matchId } });
  }

  async getMatchesQuery(query: boolean): Promise<Match[]> {
    const matches = await this.matchesModel.findAll({
      where: { inProgress: query },
      include: [{
        model: this.teamsModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: this.teamsModel,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });
    return matches;
  }

  async getMatchByStatus(): Promise<Match[]> {
    const matches = await this.matchesModel.findAll({ where: { inProgress: false } });
    return matches;
  }

  static async getMatchByField(field: number | undefined, local: string) {
    if (local === 'homeTeam') {
      return MatchesModel
        .findAll({ where: ({ homeTeam: field, inProgress: false }) });
    }
    if (local === 'awayTeam') {
      return MatchesModel
        .findAll({ where: { awayTeam: field, inProgress: false } });
    }
    if (local === 'total') {
      return MatchesModel
        .findAll({ where: { total: field, inProgress: false } });
    }
  }
}
