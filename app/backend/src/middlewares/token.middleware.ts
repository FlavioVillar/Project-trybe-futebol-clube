import { Request, Response, NextFunction } from 'express';
import JwtService from '../services/jwt/jwt.service';

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || '';
  JwtService.verifyToken(token);
  next();
};
