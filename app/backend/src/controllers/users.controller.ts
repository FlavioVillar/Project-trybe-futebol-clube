import { Request, Response } from 'express';
import UserService from '../services/users.service';

export default class UserController {
  static async sigIn(req: Request, res: Response): Promise<void> {
    console.log('req.body', req.body);

    const user = await UserService.sigIn(req.body.email, req.body.password);
    res.status(201).json(user);
  }
}
