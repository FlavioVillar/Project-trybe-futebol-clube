import { StatusCodes } from 'http-status-codes';
import JwtService from '../jwt/jwt.service';
import HttpException from '../../validation/HttpException';
import LoginRepository from '../../repositories/login/login.repository';
import { ILoginService } from './ILoginService';
import { IUser } from '../../interfaces/users/IUser.interface';

export default class LoginService implements ILoginService {
  constructor(private loginRepository: LoginRepository) { }

  async login(email: IUser): Promise<string> {
    const user = await this.loginRepository.getByEmail(email);
    if (!user) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }
    const token = JwtService.createToken({ email: user.email });
    return token;
  }

  async validate(token: string): Promise<IUser> {
    const email = JwtService.verifyToken<IUser>(token);
    const user = await this.loginRepository.getByEmail(email);
    return user;
  }
}
