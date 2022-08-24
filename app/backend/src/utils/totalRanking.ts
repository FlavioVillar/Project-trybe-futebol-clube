import TeamsModel from '../database/models/teams.model';
import AwayTeamRanking from './awayTeamRanking';
import HomeTeamRaking from './homeTeamRanking';

export default class TotalRanking {
  static async countGames(team: number): Promise<any> {
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;

    const away = await AwayTeamRanking.countGames(team);
    const home = await HomeTeamRaking.countGames(team);
    totalVictories = away.totalVictories + home.totalVictories;
    totalDraws = away.totalDraws + home.totalDraws;
    totalLosses = away.totalLosses + home.totalLosses;
    return { totalVictories, totalDraws, totalLosses };
  }

  static async getGameData(team: number): Promise<any> {
    let goalsFavor = 0;
    let goalsOwn = 0;
    let goalsBalance = 0;

    const away = await AwayTeamRanking.getGameData(team);
    const home = await HomeTeamRaking.getGameData(team);
    goalsFavor = away.goalsFavor + home.goalsFavor;
    goalsOwn = away.goalsOwn + home.goalsOwn;
    goalsBalance = away.goalsBalance + home.goalsBalance;
    return { goalsFavor, goalsOwn, goalsBalance };
  }

  static async getHomeTeamClassification(team: number): Promise<any> {
    const [name] = await TeamsModel.findAll({ where: { id: team } });
    const { totalVictories, totalDraws, totalLosses } = await TotalRanking.countGames(team);
    const { goalsFavor, goalsOwn } = await TotalRanking.getGameData(team);

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
      .map(async (item) => TotalRanking.getHomeTeamClassification(item)));

    listTeams.sort((a: any, b: any) => (b.totalPoints - a.totalPoints)
      || (b.totalVictories - a.totalVictories)
      || (b.goalsBalance - a.goalsBalance)
      || (b.goalsFavor - a.goalsFavor)
      || (b.goalsOwn - a.goalsOwn));

    return listTeams;
  }
}
