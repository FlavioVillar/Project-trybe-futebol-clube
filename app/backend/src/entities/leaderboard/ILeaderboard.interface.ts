export type IGols = 'goalsFavor' | 'goalsOwn';
export type IField = 'homeTeam' | 'awayTeam';
export type IFieldGols = 'homeTeamGoals' | 'awayTeamGoals';

export interface ILeaderboardResult {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

export interface IMatchLeaderboard {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamName: string;
}

export interface ILeaderboardPoints {
  wins: 1 | 0;
  draws: 1 | 0;
  loses: 1 | 0;
  points: 0 | 1 | 3;
}
