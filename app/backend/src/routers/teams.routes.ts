import { Router } from 'express';
import Team from '../factories/Teams.factory';

const router = Router();

router.get('/teams/:id', Team.controller().getTeamById);
router.get('/teams', Team.controller().getTeams);

export default router;
