import MatchController from '../controllers/matches/match.controller';
import MatchService from '../services/matches/match.service';
import MatchRepository from '../repository/matches/matches.repository';

export default class MatchFactory {
  public static controller(): MatchController {
    const matchService = new MatchService(new MatchRepository());
    return new MatchController(matchService);
  }
}
