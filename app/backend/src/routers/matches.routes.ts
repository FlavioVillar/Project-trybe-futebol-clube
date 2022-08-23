import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import tokenMiddleware from '../middlewares/token.middleware';

const router = Router();

router.get('/matches', MatchController.getMatches);
router.post('/matches', tokenMiddleware, MatchController.createMatch);
router.patch('/matches/:id/finish', MatchController.updateMatch);
router.patch('/matches/:id', MatchController.updateMatchInProgress);
// https://medium.com/xp-inc/node-js-atualiza%C3%A7%C3%B5es-parciais-com-o-verbo-patch-61b47542fbaa

export default router;
