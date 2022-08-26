import JwtService from '../jwt/jwt.service';
import LoginRepository from '../../repository/login/login.repository';
import { ILoginService } from './ILoginService';
import Login from '../../entities/login/Login';

export default class LoginService implements ILoginService {
  constructor(private loginRepository: LoginRepository) { }

  async login(email: Login) {
    const user = await this.loginRepository.getByEmail(email);
    const token = JwtService.createToken({ email: user.email });
    return token;
  }

  async validate(token: string) {
    const email = JwtService.verifyToken<Login>(token);
    const getRole = await this.loginRepository.getByEmail(email);

    return { role: getRole?.role };
  }
}
