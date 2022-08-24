import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../entities/User';

export default class JwtService {
  static createToken(user: User): string {
    const token = jwt.sign({ data: user }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '365d',
      algorithm: 'HS256',
    });
    return token;
  }

  static validateToken(token: string): Promise<any> {
    const { email } = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { email: string };
    return Promise.resolve({ email });
  }
}
