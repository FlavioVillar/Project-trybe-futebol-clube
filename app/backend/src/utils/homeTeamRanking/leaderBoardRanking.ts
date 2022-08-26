import { ILeaderBoardRanking } from './ILeaderBoardRanking.interface';
import { ICountBoardRanking } from './ICountBoardRanking.interface';

export default class LeaderBoardRaking implements ILeaderBoardRanking {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;

  constructor(teamName: string) {
    this.name = teamName;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  }

  protected countBoardRanking(count: ICountBoardRanking) {
    this.totalPoints = (count.wins * 3) + (count.draws);
    this.totalGames = count.wins + count.draws + count.losses;
    this.totalVictories = count.wins;
    this.totalDraws = count.draws;
    this.totalLosses = count.losses;
    this.goalsFavor = count.goalsFavor;
    this.goalsOwn = count.goalsOwn;
    this.goalsBalance = count.goalsFavor - count.goalsOwn;
  }

  protected calcBoardRanking(): void {
    this.totalPoints = (this.totalVictories * 3) + (this.totalDraws);
    this.totalGames = this.totalVictories + this.totalDraws + this.totalLosses;
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.efficiency = ((((this.totalVictories * 3) + (this.totalDraws))
      / ((this.totalVictories + this.totalDraws + this.totalLosses) * 3)) * 100);
    this.efficiency.toFixed(2);
  }
}
