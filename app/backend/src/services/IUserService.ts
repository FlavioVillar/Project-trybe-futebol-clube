import ICreateUser from '../interfaces/ICreateUser.interface';
import UsersModel from '../database/models/user.model';

export default interface IUserService {
  list(): Promise<UsersModel[]>;
  create({ email, password, role }: any): Promise<ICreateUser>;
}
