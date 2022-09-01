import { IUser } from '../../interfaces/IUser.interface';

export interface ILoginService {
  login(email: IUser): Promise<string>;
  validate(token: string): Promise<IUser>;
}
