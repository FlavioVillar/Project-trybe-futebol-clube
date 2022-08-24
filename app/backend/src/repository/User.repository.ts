import User from '../entities/User';
import UserModel from '../database/models/user.model';

export default class UserRepository {
  static async getByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ where: { email } });

    return user;
  }
}
