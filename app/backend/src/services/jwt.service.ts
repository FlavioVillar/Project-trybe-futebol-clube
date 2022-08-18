import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

export default class JwtService {
  static createToken(payload: { email: string }): string {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '365d',
      algorithm: 'HS256',
    });
  }
}
