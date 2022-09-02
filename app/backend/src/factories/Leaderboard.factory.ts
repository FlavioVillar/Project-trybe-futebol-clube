import MatchesRepository from '../repositories/matches/matches.repository';
import LeaderboardController from '../controllers/leaderboard/leaderboard.controller';
import LeaderboardService from '../services/leaderboard/leaderboard.service';
import TeamsRepository from '../repositories/teams/teams.repository';
import LeaderBoard from '../utils/leaderboard.utils';

export default class LeaderboardFactory {
  public static controller(): LeaderboardController {
    const leaderboardService = new LeaderboardService(
      new TeamsRepository(),
      new LeaderBoard(new MatchesRepository()),
    );

    return new LeaderboardController(leaderboardService);
  }
}
