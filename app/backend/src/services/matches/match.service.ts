import { StatusCodes } from 'http-status-codes';
import HttpException from '../../validation/HttpException';
import { IMatchesRepository } from '../../repositories/matches/IMatchesRepository';
import { ITeamsRepository } from '../../repositories/teams/ITeamsRepository';
import { IMatch } from '../../interfaces/matches/IMatch.interface';
import { IMatchesService } from './IMatchService';

const messageUnauthorized = 'It is not possible to create a match with two equal teams';
const messageNotFound = 'There is no team with such id!';

export default class MatchesService implements IMatchesService {
  constructor(
    private matchRepository: IMatchesRepository,
    private teamsRepository: ITeamsRepository,
  ) { }

  async getMatches(): Promise<IMatch[]> {
    const matches = await this.matchRepository.getMatches();
    return matches;
  }

  async createMatch(id: IMatch): Promise<IMatch> {
    if (id.homeTeam === id.awayTeam) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, messageUnauthorized);
    }
    const teamHome = await this.teamsRepository.getTeamById(id.homeTeam);
    const teamAway = await this.teamsRepository.getTeamById(id.awayTeam);
    if (!teamHome || !teamAway) {
      throw new HttpException(StatusCodes.NOT_FOUND, messageNotFound);
    }
    const match = await this.matchRepository.createMatch(id);
    return match;
  }

  async updateMatch(id: string): Promise<void> {
    await this.matchRepository.updateMatch(id);
  }

  async updateMatchInProgress(id: string, goals: IMatch): Promise<void> {
    await this.matchRepository.updateMatchInProgress(id, goals);
  }

  async getMatchesQuery(query: boolean): Promise<IMatch[]> {
    const matches = await this.matchRepository.getMatchesQuery(query);
    return matches;
  }

  async getAllFinishedMatches(): Promise<IMatch[]> {
    const matches = await this.matchRepository.getMatchByStatus();
    return matches;
  }
}
