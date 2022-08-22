import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../validation/HttpException';
import JwtService from '../services/jwt.service';

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || '';
  const user = JwtService.validateToken(token);
  if (!user) {
    throw new HttpException(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
  }
  next();
};
