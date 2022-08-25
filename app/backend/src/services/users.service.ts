import { StatusCodes } from 'http-status-codes';
import UserRepository from '../repository/User.repository';
import HttpException from '../validation/HttpException';
import JwtService from './jwt.service';

export default class UserService {
  static async sigIn(user: string): Promise<string> {
    const userData = await UserRepository.getByEmail(user);
    if (!userData) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }
    const token = JwtService.createToken(userData);
    return token;
  }

  static async validate(token: string) {
    const user = await JwtService.validateToken(token);
    console.log('user', user);

    const getRole = await UserRepository.getByEmail(user);

    return getRole?.role as string;
  }
}
