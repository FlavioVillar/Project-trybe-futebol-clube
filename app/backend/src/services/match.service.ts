import MatchesModel from '../database/models/matches.model';
import TeamsModel from '../database/models/teams.model';

export default class MatchesService {
  static async getMatches(): Promise<any> {
    const matches = await MatchesModel.findAll({
      include: [{
        model: TeamsModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: TeamsModel,
        as: 'teamAway',
        attributes: ['teamName'],
      },
      ],
    });
    return matches;
  }
}
