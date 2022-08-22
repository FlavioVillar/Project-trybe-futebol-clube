import { StatusCodes } from 'http-status-codes';
import UsersModel from '../database/models/user.model';
import HttpException from '../validation/HttpException';
import JwtService from './jwt.service';

export default class UserService {
  static async sigIn(email: string, _password: string): Promise<string> {
    const user = await UsersModel.findOne({ where: { email } });
    if (!user) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }
    const token = JwtService.createToken({ email });
    return token;
  }

  static async validate(token: string): Promise<any> {
    const user = await JwtService.validateToken(token);
    if (!user) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
    }
    const getRole = await UsersModel.findOne({ where: { email: user.email } });

    return { role: getRole?.role };
  }
}
