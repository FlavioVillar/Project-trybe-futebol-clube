import MatchesModel from '../database/models/matches.model';
import TeamsModel from '../database/models/teams.model';

export default class HomeTeamRaking {
  static async countGames(team: number): Promise<any> {
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;

    const getAllMatches = await MatchesModel
      .findAll({ where: { homeTeam: team, inProgress: false } });

    getAllMatches.map((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        totalVictories += 1;
      } else if (match.homeTeamGoals === match.awayTeamGoals) {
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
      .findAll({ where: { homeTeam: team, inProgress: false } });

    getAllMatches.map((match) => {
      goalsFavor += match.homeTeamGoals;
      goalsOwn += match.awayTeamGoals;
      goalsBalance += match.homeTeamGoals - match.awayTeamGoals;
      return goalsFavor;
    });
    return { goalsFavor, goalsOwn, goalsBalance };
  }

  static async getHomeTeamClassification(team: number): Promise<any> {
    const [name] = await TeamsModel.findAll({ where: { id: team } });
    const { totalVictories, totalDraws, totalLosses } = await
    HomeTeamRaking.countGames(team);
    const { goalsFavor, goalsOwn } = await HomeTeamRaking.getGameData(team);

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
      .map(async (item) => HomeTeamRaking.getHomeTeamClassification(item)));

    listTeams.sort((a: any, b: any) => (b.totalPoints - a.totalPoints)
      || (b.totalVictories - a.totalVictories)
      || (b.goalsBalance - a.goalsBalance)
      || (b.goalsFavor - a.goalsFavor)
      || (b.goalsOwn - a.goalsOwn));

    return listTeams;
  }
}
