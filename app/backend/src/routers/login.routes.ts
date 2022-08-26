import { Router } from 'express';
import LoginMiddleware from '../middlewares/login.middleware';
import LoginController from '../controllers/login/login.controller';
import LoginService from '../services/login/login.service';
import LoginRepository from '../repository/login.repository';

const router = Router();

const loginController = new LoginController(new LoginService(new LoginRepository()));

router.post('/login', LoginMiddleware, loginController.login);
router.get('/login/validate', loginController.validate);

export default router;
