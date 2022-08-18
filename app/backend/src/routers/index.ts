import { Router } from 'express';
import loginRoute from './login.routes';

const router = Router();

router.use(loginRoute);

export default router;
