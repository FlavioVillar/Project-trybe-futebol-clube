import { ILeaderboardResult } from '../../entities/leaderboard/ILeaderboard.interface';
import TeamsModel from '../../database/models/teams.model';
import MatchesRepository from '../../repository/matches/matches.repository';

export default class Ranking {
  static async countGames(teamId: number, local: string) {
    const count = { totalVictories: 0, totalDraws: 0, totalLosses: 0, goalsFavor: 0, goalsOwn: 0 };
    const getAllMatches = await MatchesRepository.getMatchByField(teamId, local);
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
    return count;
  }

  static async calcRanking(teams: TeamsModel, local: string) {
    const score = await Ranking.countGames(teams.id, local);

    const board = {
      name: teams.teamName,
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
    const getAllTeams = await TeamsModel.findAll({ attributes: ['id', 'teamName'] });
    if (local === 'total') {
      console.log('local total');

      const getHome = await Promise.all(getAllTeams
        .map(async (teams) => Ranking.calcRanking(teams, 'homeTeam')));

      const getAway = await Promise.all(getAllTeams
        .map(async (teams) => Ranking.calcRanking(teams, 'awayTeam')));

      const getTotal = getHome.concat(getAway);
      const finalList = await Ranking.sortBoard(getTotal);
      return finalList;
    }

    const getFinalList = await Promise.all(getAllTeams
      .map(async (teams) => Ranking.calcRanking(teams, local)));

    const results = await Ranking.sortBoard(getFinalList);
    return results;
  }
}
