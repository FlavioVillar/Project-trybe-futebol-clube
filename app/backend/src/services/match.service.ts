import MatchesModel from '../database/models/matches.model';
import TeamsModel from '../database/models/teams.model';

export default class MatchesService {
  static async getMatches(): Promise<any> {
    const matches = await MatchesModel.findAll();
    const teams = await TeamsModel.findAll();
    const matchesWithTeams = matches.map((match) => {
      const homeTeam = teams.find((team) => team.id === match.id);
      const awayTeam = teams.find((team) => team.id === match.awayTeam);
      return {
        ...matches,
        teamHome: { teamName: homeTeam?.teamName },
        teamAway: { teamName: awayTeam?.teamName },
      };
    });
    return matchesWithTeams;
  }
}

// const matchesWithTeams = matches.map((match) => {
//   const homeTeamName = teamsMap[homeTeam.id].name;
//   const awayTeamName = teamsMap[awayTeam.id].name;
//   return {
//     ...matches,
//     teamHome: { teamName: homeTeamName },
//     teamAway: { teamName: awayTeamName },
//   };
// });
// return matchesWithTeams;
