import { IMatch } from '../../interfaces/matches/IMatch.interface';

export interface IMatchesService {
  getMatches(): Promise<IMatch[]>;
  createMatch(id: IMatch): Promise<IMatch>;
  updateMatch(id: string): Promise<void>;
  updateMatchInProgress(id: string, goals: IMatch): Promise<void>;
  getMatchesQuery(query: boolean): Promise<IMatch[]>;
  getAllFinishedMatches(): Promise<IMatch[]>;
}
