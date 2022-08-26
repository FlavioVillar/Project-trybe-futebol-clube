import { NextFunction, Request, Response } from 'express';

export interface ILoginController {
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
  validate(req: Request, res: Response, next: NextFunction): Promise<void>;
}
