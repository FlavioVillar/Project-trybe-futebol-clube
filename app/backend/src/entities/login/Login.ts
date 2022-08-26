import { ILoginDTO } from './ILogin.interface';

export default class Login implements ILoginDTO {
  email: string;
  token: string;
  role: string;

  constructor() {
    this.email = '';
    this.token = '';
    this.role = '';
  }
}
