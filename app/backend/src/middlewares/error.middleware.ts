import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import StatusCodes from 'http-status-codes';
import HttpException from '../validation/HttpException';

class ErrorMiddleware {
  errorHandler: ErrorRequestHandler =
  (err: HttpException, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  };
}

const errorMiddleware = new ErrorMiddleware();

export default errorMiddleware;

// const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
//   const { name, message } = err;
//   switch (name) {
//     case 'ValidationError':
//       return res.status(400).json({ message });
//     case 'JsonWebTokenError':
//       return res.status(401).json({ message });
//     case 'NotFoundError':
//       return res.status(404).json({ message });
//     case 'ConflictError':
//       return res.status(409).json({ message });
//     case 'UnauthorizedError':
//       res.status(401).json({ message });
//       break;
//     default:
//       res.status(500).json({ message });
//       break;
//   }
// };

// export default errorMiddleware;
