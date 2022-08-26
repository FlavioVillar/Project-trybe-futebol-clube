import Login from '../../entities/login/Login';

export interface ILoginService {
  login(email: Login): Promise<string>;
  validate(token: string): Promise<{ role: string }>;
}
