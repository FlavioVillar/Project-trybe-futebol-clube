import { Router } from 'express';
import UserController from '../controllers/users.controller';
import LoginMiddleware from '../middlewares/login.middleware';

const router = Router();

router.post('/login', LoginMiddleware, UserController.sigIn);
router.get('/login/validate', UserController.validate);

export default router;
