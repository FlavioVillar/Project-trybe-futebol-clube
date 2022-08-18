import { NextFunction, Request, Response } from 'express';
import UserService from '../services/users.service';

export default class UserController {
  static async sigIn(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = await UserService.sigIn(req.body.email, req.body.password);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
