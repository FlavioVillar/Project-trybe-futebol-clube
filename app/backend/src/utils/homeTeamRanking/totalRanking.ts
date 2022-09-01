import {
  ILeaderboardResult,
  ILeaderboardPoints,
} from '../../entities/leaderboard/ILeaderboard.interface';
import TeamsModel from '../../database/models/teams.model';
import MatchesRepository from '../../repository/matches/matches.repository';

export default class Ranking {
  static async countGames(teams: TeamsModel, local: string) {
    const getAllMatches = await MatchesRepository.getMatchByField(teams.id, local);

    const count = { totalVictories: 0, totalDraws: 0, totalLosses: 0, goalsFavor: 0, goalsOwn: 0 };

    getAllMatches?.map((match) => {
      if (local === 'homeTeam') {
        count.goalsFavor += match.homeTeamGoals; count.goalsOwn += match.awayTeamGoals;
        if (match.homeTeamGoals > match.awayTeamGoals) count.totalVictories += 1;
        else if (match.homeTeamGoals === match.awayTeamGoals) count.totalDraws += 1;
        else count.totalLosses += 1;
      }
      if (local === 'awayTeam') {
        count.goalsFavor += match.awayTeamGoals; count.goalsOwn += match.homeTeamGoals;
        if (match.awayTeamGoals > match.homeTeamGoals) count.totalVictories += 1;
        else if (match.awayTeamGoals === match.homeTeamGoals) count.totalDraws += 1;
        else count.totalLosses += 1;
      }
      return count;
    });
    return Ranking.calcRanking(count as ILeaderboardPoints, teams.teamName);
  }

  static async getTotalRanking(teams: TeamsModel) {
    const count = { totalVictories: 0, totalDraws: 0, totalLosses: 0, goalsFavor: 0, goalsOwn: 0 };
    const home = await Ranking.countGames(teams, 'homeTeam');
    const away = await Ranking.countGames(teams, 'awayTeam');
    count.goalsFavor += home.goalsFavor + away.goalsFavor;
    count.goalsOwn += home.goalsOwn + away.goalsOwn;
    count.totalVictories += home.totalVictories + away.totalVictories;
    count.totalDraws += home.totalDraws + away.totalDraws;
    count.totalLosses += home.totalLosses + away.totalLosses;
    return Ranking.calcRanking(count as ILeaderboardPoints, teams.teamName);
  }

  static async calcRanking(score: ILeaderboardPoints, teamName: string) {
    const board = {
      name: teamName,
      totalPoints: (score.totalVictories * 3) + (score.totalDraws),
      totalGames: score.totalVictories + score.totalDraws + score.totalLosses,
      totalVictories: score.totalVictories,
      totalDraws: score.totalDraws,
      totalLosses: score.totalLosses,
      goalsFavor: score.goalsFavor,
      goalsOwn: score.goalsOwn,
      goalsBalance: score.goalsFavor - score.goalsOwn,
      efficiency: ((((score.totalVictories * 3) + (score.totalDraws))
        / ((score.totalVictories + score.totalDraws + score.totalLosses) * 3)) * 100).toFixed(2),
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

  static async finalList(local: string) {
    const teams = await TeamsModel.findAll({ attributes: ['id', 'teamName'] });
    if (local === 'total') {
      const list = await Promise.all(teams.map(async (item) => Ranking.getTotalRanking(item)));
      const results = await Ranking.sortBoard(list);
      return results;
    }
    const list = await Promise.all(teams.map(async (item) => Ranking.countGames(item, local)));
    const results = await Ranking.sortBoard(list);
    return results;
  }
}
