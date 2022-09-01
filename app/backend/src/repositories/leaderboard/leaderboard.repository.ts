import TeamsModel from '../../database/models/teams.model';
import MatchesModel from '../../database/models/matches.model';
import Match from '../../entities/matches/Match';
import { ITeams } from '../../interfaces/teams/ITeams.interface';
import ILeaderboardRepository from './ILeaderboardRepository';

export default class LeaderBoardRepository implements ILeaderboardRepository {
  constructor(private teamsModel = TeamsModel, private matchesModel = MatchesModel) { }

  async getAllMatches(field: string): Promise<Match[]> {
    const getAllMatches = await this.matchesModel
      .findAll({ where: { inProgress: false }, attributes: [field] });
    return getAllMatches;
  }

  async getMatchesByTeamId(teamId: number): Promise<Match[]> {
    const getAllMatches = await this.matchesModel
      .findAll({ where: { homeTeam: teamId, inProgress: false } });
    return getAllMatches;
  }

  async getTeamsById(teamId: number): Promise<ITeams[]> {
    const getAllTeams = await this.teamsModel.findAll({ where: { id: teamId } });
    return getAllTeams;
  }

  async findAllTeams(): Promise<ITeams[]> {
    const getAllTeams = await this.teamsModel.findAll({ attributes: ['id', 'teamName'] });
    return getAllTeams;
  }
}
