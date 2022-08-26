import JwtService from '../jwt/jwt.service';
import LoginRepository from '../../repository/login.repository';
import { ILoginService } from './ILoginService';

export default class LoginService implements ILoginService {
  constructor(private loginRepository: LoginRepository) { }

  async login(email: string) {
    const user = await this.loginRepository.getByEmail(email);
    const token = JwtService.createToken({ email: user.email });
    return token;
  }

  async validate(token: string) {
    const { email } = JwtService.verifyToken(token) as { email: string };
    const getRole = await this.loginRepository.getByEmail(email);

    return { role: getRole?.role };
  }
}
