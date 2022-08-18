import { Request, Response, NextFunction } from 'express';
import loginSchema from '../schemas/login.schema';

export default (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};
