import { IMatch } from '../../interfaces/matches/IMatch.interface';

export interface IMatchesRepository {
  getMatches(): Promise<IMatch[]>;
  createMatch(id: IMatch): Promise<IMatch>;
  updateMatch(match: string): Promise<void>;
  updateMatchInProgress(matchId: string, goals: IMatch): Promise<void>;
  getMatchesQuery(query: boolean): Promise<IMatch[]>;
  getMatchByStatus(): Promise<IMatch[]>;
}
