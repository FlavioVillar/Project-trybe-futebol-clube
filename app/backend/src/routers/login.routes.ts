import { Router } from 'express';
import UserController from '../controllers/users.controller';

const loginRouter = Router();

loginRouter.post('/', UserController.sigIn);

export default loginRouter;
