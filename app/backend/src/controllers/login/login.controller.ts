import { NextFunction, Request, Response } from 'express';
import { ILoginService } from '../../services/login/ILoginService';

export default class LoginController {
  constructor(private loginService: ILoginService) {
    this.login = this.login.bind(this);
    this.validate = this.validate.bind(this);
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = await this.loginService.login(req.body);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  async validate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const getToken = req.headers.authorization || '';
      const user = await this.loginService.validate(getToken);
      res.status(200).json({ role: user.role });
    } catch (error) {
      next(error);
    }
  }
}
