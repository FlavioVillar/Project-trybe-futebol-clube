import UserModel from '../database/models/user.model';

export default interface ILoginRepository {
  getByEmail(email: string): Promise<UserModel>;
}
