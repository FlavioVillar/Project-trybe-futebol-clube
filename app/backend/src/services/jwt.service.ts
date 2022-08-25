import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

export default class JwtService {
  static createToken(payload: { email: string }): string {
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
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
