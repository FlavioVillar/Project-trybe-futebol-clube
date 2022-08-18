import UsersModel from '../database/models/user.model';

import JwtService from './jwt.service';

export default class UserService {
  static async sigIn(email: string, _password: string): Promise<string> {
    const user = await UsersModel.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email or password');
    }
    const token = JwtService.createToken({ email });
    return token;
  }
}
