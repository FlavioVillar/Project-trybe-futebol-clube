import { IUser } from './interfaces/IUser';

export default class User implements IUser {
  public readonly id: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;

  constructor() {
    this.id = 0;
    this.username = '';
    this.role = '';
    this.email = '';
    this.password = '';
  }
}
