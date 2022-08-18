import { Router } from 'express';
import UserController from '../controllers/users.controller';

const router = Router();

router.post('/login', UserController.sigIn);

export default router;
