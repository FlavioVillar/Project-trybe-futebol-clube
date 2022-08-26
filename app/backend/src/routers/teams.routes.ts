import { Router } from 'express';
import TeamController from '../controllers/teams/teams.controller';
import TeamService from '../services/teams/teams.service';
import TeamRepository from '../repository/teams/teams.repository';

const router = Router();

const teamController = new TeamController(new TeamService(new TeamRepository()));

router.get('/teams/:id', teamController.getTeamById);
router.get('/teams', teamController.getTeams);

export default router;
