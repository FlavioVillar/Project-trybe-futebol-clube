import { IUser } from '../../interfaces/users/IUser.interface';

export default interface ILoginRepository {
  getByEmail(email: IUser): Promise<IUser>;
}
