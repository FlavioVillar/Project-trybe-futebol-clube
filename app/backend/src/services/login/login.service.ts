import JwtService from '../jwt/jwt.service';
import LoginRepository from '../../repositories/login/login.repository';
import { ILoginService } from './ILoginService';
import { IUser } from '../../interfaces/users/IUser.interface';

export default class LoginService implements ILoginService {
  constructor(private loginRepository: LoginRepository) { }

  async login(email: IUser): Promise<string> {
    const user = await this.loginRepository.getByEmail(email);
    const token = JwtService.createToken({ email: user.email });
    return token;
  }

  async validate(token: string): Promise<IUser> {
    const email = JwtService.verifyToken<IUser>(token);
    const getRole = await this.loginRepository.getByEmail(email);

    return getRole;
  }
}
