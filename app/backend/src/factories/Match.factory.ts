import MatchController from '../controllers/matches/match.controller';
import MatchService from '../services/matches/match.service';
import MatchRepository from '../repositories/matches/matches.repository';
import TeamsRepository from '../repositories/teams/teams.repository';

export default class MatchFactory {
  public static controller(): MatchController {
    const matchService = new MatchService(new MatchRepository(), new TeamsRepository());
    return new MatchController(matchService);
  }
}
