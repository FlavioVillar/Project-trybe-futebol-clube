import { Router } from 'express';
import UserController from '../controllers/users.controller';
import LoginMiddleware from '../middlewares/login.middleware';

const router = Router();

router.post('/login', LoginMiddleware, UserController.sigIn);
// para login validate
//  https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
export default router;
