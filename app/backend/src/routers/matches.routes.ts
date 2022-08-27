import { Router } from 'express';
import Match from '../factories/Match.factory';
import tokenMiddleware from '../middlewares/token.middleware';

const router = Router();

router.get('/matches', Match.controller().getMatches);
router.post('/matches', tokenMiddleware, Match.controller().createMatch);
router.patch('/matches/:id/finish', Match.controller().updateMatch);
router.patch('/matches/:id', Match.controller().updateMatchInProgress);
// https://medium.com/xp-inc/node-js-atualiza%C3%A7%C3%B5es-parciais-com-o-verbo-patch-61b47542fbaa

export default router;
