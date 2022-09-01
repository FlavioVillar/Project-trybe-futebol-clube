import {
  ILeaderboardResult,
  ICountRanking,
} from '../entities/leaderboard/ILeaderboard.interface';
import { ITeams } from '../interfaces/teams/ITeams.interface';
import MatchesRepository from '../repositories/matches/matches.repository';

export default class LeaderBoard {
  static async countGames(teams: ITeams, local: string) {
    const getAllMatches = await MatchesRepository.getMatchByField(teams.id, local);

    const count = { wins: 0, draws: 0, losses: 0, homeGols: 0, awayGols: 0 } as ICountRanking;

    getAllMatches?.map((match) => {
      if (local === 'homeTeam') {
        count.homeGols += match.homeTeamGoals; count.awayGols += match.awayTeamGoals;
        if (match.homeTeamGoals > match.awayTeamGoals) count.wins += 1;
        else if (match.homeTeamGoals === match.awayTeamGoals) count.draws += 1;
        else count.losses += 1;
      }
      if (local === 'awayTeam') {
        count.homeGols += match.awayTeamGoals; count.awayGols += match.homeTeamGoals;
        if (match.awayTeamGoals > match.homeTeamGoals) count.wins += 1;
        else if (match.awayTeamGoals === match.homeTeamGoals) count.draws += 1;
        else count.losses += 1;
      }
      return count;
    });
    return LeaderBoard.calcRanking(count, teams);
  }

  static async getTotalRanking(teams: ITeams) {
    const count = { wins: 0, draws: 0, losses: 0, homeGols: 0, awayGols: 0 } as ICountRanking;
    const home = await LeaderBoard.countGames(teams, 'homeTeam');
    const away = await LeaderBoard.countGames(teams, 'awayTeam');
    count.homeGols += home.goalsFavor + away.goalsFavor;
    count.awayGols += home.goalsOwn + away.goalsOwn;
    count.wins += home.totalVictories + away.totalVictories;
    count.draws += home.totalDraws + away.totalDraws;
    count.losses += home.totalLosses + away.totalLosses;
    return LeaderBoard.calcRanking(count, teams);
  }

  static async calcRanking(score: ICountRanking, teams: ITeams):
  Promise<ILeaderboardResult> {
    const board = {
      name: teams.teamName,
      totalPoints: (score.wins * 3) + (score.draws),
      totalGames: score.wins + score.draws + score.losses,
      totalVictories: score.wins,
      totalDraws: score.draws,
      totalLosses: score.losses,
      goalsFavor: score.homeGols,
      goalsOwn: score.awayGols,
      goalsBalance: score.homeGols - score.awayGols,
      efficiency: ((((score.wins * 3) + (score.draws))
        / ((score.wins + score.draws + score.losses) * 3)) * 100).toFixed(2),
    };
    return board;
  }

  static async sortBoard(finalList: ILeaderboardResult[]) {
    finalList.sort((a, b) => (b.totalPoints - a.totalPoints)
      || (b.totalVictories - a.totalVictories)
      || (b.goalsBalance - a.goalsBalance)
      || (b.goalsFavor - a.goalsFavor)
      || (b.goalsOwn - a.goalsOwn));
    return finalList;
  }
}
