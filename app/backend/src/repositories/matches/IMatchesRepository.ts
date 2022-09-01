import { IMatchCreate } from '../../entities/matches/IMatch.interface';
import Match from '../../entities/matches/Match';

export interface IMatchesRepository {
  getMatches(): Promise<Match[]>;
  createMatch(id: IMatchCreate): Promise<Match>;
  updateMatch(match: string): Promise<void>;
  updateMatchInProgress(matchId: string, goals: Match): Promise<void>;
  getMatchesQuery(query: boolean): Promise<Match[]>;
  getMatchByStatus(): Promise<Match[]>;
}
