import { Router } from 'express';
import TeamController from '../controllers/teams.controller';

const router = Router();

router.get('/teams/:id', TeamController.getTeamById);
router.get('/teams', TeamController.getTeams);

export default router;
