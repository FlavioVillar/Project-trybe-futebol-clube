import { IUser } from '../../interfaces/IUser.interface';

export default interface ILoginRepository {
  getByEmail(email: IUser): Promise<IUser>;
}
