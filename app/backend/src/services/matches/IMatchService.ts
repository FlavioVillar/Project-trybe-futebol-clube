import Match from '../../entities/matches/Match';
import { IMatchCreate } from '../../entities/matches/IMatch.interface';

export interface IMatchesService {
  getMatches(): Promise<Match[]>;
  createMatch(id: IMatchCreate): Promise<Match>;
  updateMatch(id: string): Promise<void>;
  updateMatchInProgress(id: string, goals: Match): Promise<void>;
  getMatchesQuery(query: boolean): Promise<Match[]>;
  getAllFinishedMatches(): Promise<Match[]>;
}
