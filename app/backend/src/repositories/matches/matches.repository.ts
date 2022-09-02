import MatchesModel from '../../database/models/matches.model';
import TeamsModel from '../../database/models/teams.model';
import { IMatchesRepository } from './IMatchesRepository';
import { IMatch } from '../../interfaces/matches/IMatch.interface';

export default class MatchesRepository implements IMatchesRepository {
  constructor(
    private matchesModel = MatchesModel,
    private teamsModel = TeamsModel,
  ) { }

  async getMatches(): Promise<IMatch[]> {
    const matches = await this.matchesModel.findAll({
      include: [{
        model: this.teamsModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: this.teamsModel,
        as: 'teamAway',
        attributes: ['teamName'],
      },
      ],
    });
    return matches;
  }

  async createMatch(id: IMatch): Promise<IMatch> {
    const match = await this.matchesModel.create({
      homeTeam: id.homeTeam,
      awayTeam: id.awayTeam,
      homeTeamGoals: id.homeTeamGoals,
      awayTeamGoals: id.awayTeamGoals,
      inProgress: true,
    });

    return match;
  }

  async updateMatch(match: string): Promise<void> {
    await this.matchesModel.update({ inProgress: false }, { where: { id: match } });
  }

  async updateMatchInProgress(matchId: string, goals: IMatch): Promise<void> {
    await this.matchesModel
      .update({
        homeTeamGoals: goals.homeTeamGoals,
        awayTeamGoals: goals.awayTeamGoals,
        inProgress: true,
      }, { where: { id: matchId } });
  }

  async getMatchesQuery(query: boolean): Promise<IMatch[]> {
    const matches = await this.matchesModel.findAll({
      where: { inProgress: query },
      include: [{
        model: this.teamsModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: this.teamsModel,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });
    return matches;
  }

  async getMatchByStatus(): Promise<IMatch[]> {
    const matches = await this.matchesModel.findAll({ where: { inProgress: false } });
    return matches;
  }

  async getMatchByField(teamId: number | undefined, local: string): Promise<IMatch[]> {
    const matches = await this.matchesModel
      .findAll({ where: { [local]: teamId, inProgress: false } });
    return matches;
  }
}
