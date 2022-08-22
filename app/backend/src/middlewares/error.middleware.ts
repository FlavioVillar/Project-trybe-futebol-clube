import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import StatusCodes from 'http-status-codes';
import HttpException from '../validation/HttpException';

class ErrorMiddleware {
  errorHandler: ErrorRequestHandler =
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.log(err);

    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  };
}

const errorMiddleware = new ErrorMiddleware();

export default errorMiddleware;
