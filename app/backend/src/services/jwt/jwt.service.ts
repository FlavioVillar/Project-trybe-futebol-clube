import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';

export default class JwtService {
  static createToken(payload: { email: string }) {
    const token = sign(payload, process.env.JWT_SECRET || 'secret', {
      expiresIn: '365d',
      algorithm: 'HS256',
    });
    return token;
  }

  static verifyToken<T>(token: string): T {
    const email = verify(token, process.env.JWT_SECRET || 'secret');
    return email as T;
  }
}
