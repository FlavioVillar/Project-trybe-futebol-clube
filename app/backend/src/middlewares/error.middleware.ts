import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'ValidationError':
      return res.status(400).json({ message });
    case 'JsonWebTokenError':
      return res.status(401).json({ message });
    case 'NotFoundError':
      return res.status(404).json({ message });
    case 'ConflictError':
      return res.status(409).json({ message });
    case 'UnauthorizedError':
      res.status(401).json({ message });
      break;
    default:
      res.status(500).json({ message });
      break;
  }
};

export default errorMiddleware;
