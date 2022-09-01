import { IMatchesRepository } from '../../repositories/matches/IMatchesRepository';
import Match from '../../entities/matches/Match';
import { IMatchCreate } from '../../entities/matches/IMatch.interface';
import { IMatchesService } from './IMatchService';

export default class MatchesService implements IMatchesService {
  constructor(private repository: IMatchesRepository) {}

  async getMatches(): Promise<Match[]> {
    const matches = await this.repository.getMatches();
    return matches;
  }

  async createMatch(id: IMatchCreate): Promise<Match> {
    const match = await this.repository.createMatch(id);
    return match;
  }

  async updateMatch(id: string): Promise<void> {
    await this.repository.updateMatch(id);
  }

  async updateMatchInProgress(id: string, goals: Match): Promise<void> {
    await this.repository.updateMatchInProgress(id, goals);
  }

  async getMatchesQuery(query: boolean): Promise<Match[]> {
    const matches = await this.repository.getMatchesQuery(query);
    return matches;
  }

  async getAllFinishedMatches(): Promise<Match[]> {
    const matches = await this.repository.getMatchByStatus();
    return matches;
  }
}
