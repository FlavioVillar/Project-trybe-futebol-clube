import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import StatusCodes from 'http-status-codes';
import { JsonWebTokenError } from 'jsonwebtoken';
import HttpException from '../validation/HttpException';

class ErrorMiddleware {
  errorHandler: ErrorRequestHandler =
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    // console.log(err);

    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ message: err.message });
    } else if (err instanceof JsonWebTokenError) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token must be a valid token' });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  };
}

const errorMiddleware = new ErrorMiddleware();

export default errorMiddleware;
