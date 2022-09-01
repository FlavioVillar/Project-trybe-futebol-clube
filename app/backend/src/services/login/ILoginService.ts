import { IUser } from '../../interfaces/users/IUser.interface';

export interface ILoginService {
  login(email: IUser): Promise<string>;
  validate(token: string): Promise<IUser>;
}
