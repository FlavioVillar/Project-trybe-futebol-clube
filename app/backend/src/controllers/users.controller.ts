import { NextFunction, Request, Response } from 'express';
import UserService from '../services/users.service';

export default class UserController {
  static async sigIn(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = await UserService.sigIn(req.body.email);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  static async validate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.authorization || '';
      const role = await UserService.validate(token);
      res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  }
}
