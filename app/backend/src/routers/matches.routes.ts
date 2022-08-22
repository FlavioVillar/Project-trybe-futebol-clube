import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const router = Router();

router.get('/matches', MatchController.getMatches);
router.post('/matches', MatchController.createMatch);

export default router;
