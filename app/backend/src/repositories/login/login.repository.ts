import UsersModel from '../../database/models/user.model';
import ILoginRepository from './ILoginRepository.interface';
import { IUser } from '../../interfaces/users/IUser.interface';

export default class LoginRepository implements ILoginRepository {
  constructor(private model = UsersModel) { }

  async getByEmail(user: IUser): Promise<IUser> {
    const getUser = await this.model.findOne({ where: { email: user.email } });
    return getUser as IUser;
  }
}
