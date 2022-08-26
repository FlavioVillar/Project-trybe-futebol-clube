import Login from '../entities/login/Login';
import UserModel from '../database/models/user.model';

export default interface ILoginRepository {
  getByEmail(email: Login): Promise<UserModel>;
}
