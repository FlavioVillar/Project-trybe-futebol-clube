import { JwtPayload, sign, verify } from 'jsonwebtoken';
import 'dotenv/config';
import User from '../entities/User';

export default class JwtService {
  static createToken(user: User): string {
    const token = sign({ data: user }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '365d',
      algorithm: 'HS256',
    });
    return token;
  }

  static validateToken(token: string): Promise<string> {
    const { email } = verify(token, process.env.JWT_SECRET || 'secret') as JwtPayload;
    return email;
  }
}
