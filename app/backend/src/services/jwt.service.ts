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
    // return new Promise((resolve, reject) => {
    //   jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
    //     if (err) {
    //       reject(err);
    //     }
    //     resolve(decoded);
    //   });
    // });
    const { email } = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { email: string };
    return Promise.resolve({ email });
  }
}
