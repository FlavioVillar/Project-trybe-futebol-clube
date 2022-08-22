import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const router = Router();

router.get('/matches', MatchController.getMatches);
router.post('/matches', MatchController.createMatch);
router.patch('/matches/:id/finish', MatchController.updateMatch);
// https://medium.com/xp-inc/node-js-atualiza%C3%A7%C3%B5es-parciais-com-o-verbo-patch-61b47542fbaa

export default router;
