import { ILeaderboardResult, IField } from '../../interfaces/leaderboard/ILeaderboard.interface';

export interface ILeaderboardService {
  getFieldRanking(local: IField): Promise<ILeaderboardResult[]>;
  getRanking(): Promise<ILeaderboardResult[]>;
}
