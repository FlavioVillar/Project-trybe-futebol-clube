import { StatusCodes } from 'http-status-codes';
import UsersModel from '../database/models/user.model';
import HttpException from '../validation/HttpException';
import ILoginRepository from './ILoginRepository.interface';

export default class LoginRepository implements ILoginRepository {
  constructor(private model = UsersModel) { }

  async getByEmail(email: string) {
    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user;
  }
}
