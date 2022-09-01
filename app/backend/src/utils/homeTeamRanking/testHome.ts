import MatchesModel from '../../database/models/matches.model';
import TeamsModel from '../../database/models/teams.model';

export default class TeamRanking {
  static async countGames(team: number) {
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;
    let goalsFavor = 0;
    let goalsOwn = 0;

    const getAllMatches = await MatchesModel
      .findAll({ where: { homeTeam: team, inProgress: false } });

    getAllMatches.map((match) => {
      goalsFavor += match.homeTeamGoals;
      goalsOwn += match.awayTeamGoals;
      if (match.homeTeamGoals > match.awayTeamGoals) totalVictories += 1;
      else if (match.homeTeamGoals === match.awayTeamGoals) totalDraws += 1;
      else totalLosses += 1;
      return totalVictories;
    });
    return { totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn };
  }

  static async finalList(team: TeamsModel) {
    const score = await TeamRanking.countGames(team.id);
    const listTeams = {
      name: team.teamName,
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
    return listTeams;
  }
}
