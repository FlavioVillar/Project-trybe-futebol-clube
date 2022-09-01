import TeamController from '../controllers/teams/teams.controller';
import TeamService from '../services/teams/teams.service';
import TeamRepository from '../repositories/teams/teams.repository';

export default class TeamFactory {
  public static controller(): TeamController {
    const teamService = new TeamService(new TeamRepository());
    return new TeamController(teamService);
  }
}
