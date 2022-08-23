import MatchesModel from '../database/models/matches.model';
import TeamsModel from '../database/models/teams.model';

export default class AwayTeamRanking {
  static async countGames(team: number): Promise<any> {
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;

    const getAllMatches = await MatchesModel
      .findAll({ where: { awayTeam: team, inProgress: false } });

    getAllMatches.map((match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) {
        totalVictories += 1;
      } else if (match.awayTeamGoals === match.homeTeamGoals) {
        totalDraws += 1;
      } else {
        totalLosses += 1;
      }
      return totalVictories;
    });
    return { totalVictories, totalDraws, totalLosses };
  }

  static async getGameData(team: number): Promise<any> {
    let goalsFavor = 0;
    let goalsOwn = 0;
    let goalsBalance = 0;

    const getAllMatches = await MatchesModel
      .findAll({ where: { awayTeam: team, inProgress: false } });

    getAllMatches.map((match) => {
      goalsFavor += match.awayTeamGoals;
      goalsOwn += match.homeTeamGoals;
      goalsBalance += match.awayTeamGoals - match.homeTeamGoals;
      return goalsFavor;
    });
    return { goalsFavor, goalsOwn, goalsBalance };
  }

  static async getHomeTeamClassification(team: number): Promise<any> {
    const [name] = await TeamsModel.findAll({ where: { id: team } });
    const { totalVictories, totalDraws, totalLosses } = await
    AwayTeamRanking.countGames(team);
    const { goalsFavor, goalsOwn } = await AwayTeamRanking.getGameData(team);

    return {
      name: name.teamName,
      totalPoints: (totalVictories * 3) + (totalDraws),
      totalGames: totalVictories + totalDraws + totalLosses,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: ((((totalVictories * 3) + (totalDraws))
        / ((totalVictories + totalDraws + totalLosses) * 3)) * 100).toFixed(2),

    };
  }

  static async finalList(team: number[]): Promise<any> {
    const listTeams = await Promise.all(team
      .map(async (item) => AwayTeamRanking.getHomeTeamClassification(item)));

    listTeams.sort((a: any, b: any) => (b.totalPoints - a.totalPoints)
      || (b.totalVictories - a.totalVictories)
      || (b.goalsBalance - a.goalsBalance)
      || (b.goalsFavor - a.goalsFavor)
      || (b.goalsOwn - a.goalsOwn));

    return listTeams;
  }
}
