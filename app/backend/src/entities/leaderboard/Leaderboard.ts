// import {
//   ILeaderboardResult,
//   ICountBoardRanking,
//   ILeaderboardPoints,
// } from './ILeaderboard.interface';

// export default class Leaderboard implements ILeaderboardResult {
//   name: string;
//   totalPoints: number;
//   totalGames: number;
//   totalVictories: number;
//   totalDraws: number;
//   totalLosses: number;
//   goalsFavor: number;
//   goalsOwn: number;
//   goalsBalance: number;
//   efficiency: string;
//   wins: number;
//   draws: number;
//   losses: number;
//   homeGols: number;
//   awayGols: number;

//   constructor(teamName: string) {
//     this.name = teamName;
//     this.totalPoints = 0;
//     this.totalGames = 0;
//     this.totalVictories = 0;
//     this.totalDraws = 0;
//     this.totalLosses = 0;
//     this.goalsFavor = 0;
//     this.goalsOwn = 0;
//     this.goalsBalance = 0;
//     this.efficiency = '';
//     this.wins = 0;
//     this.draws = 0;
//     this.losses = 0;
//     this.homeGols = 0;
//     this.awayGols = 0;
//   }

//   protected calcGames(count: ILeaderboardPoints) {
//     this.homeGols = count.goalsFavor;
//     this.awayGols = count.goalsOwn;
//     this.wins = count.totalVictories;
//     this.draws = count.totalDraws;
//     this.losses = count.totalLosses;
//   }

//   protected countBoardRanking(count: ICountBoardRanking) {
//     this.totalPoints = (count.wins * 3) + (count.draws);
//     this.totalGames = count.wins + count.draws + count.losses;
//     this.totalVictories = this.wins;
//     this.totalDraws = this.draws;
//     this.totalLosses = this.losses;
//     this.goalsFavor = this.homeGols;
//     this.goalsOwn = this.awayGols;
//     this.goalsBalance = this.homeGols - this.awayGols;
//   }
// }
