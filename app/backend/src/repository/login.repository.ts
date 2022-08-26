import { StatusCodes } from 'http-status-codes';
import UsersModel from '../database/models/user.model';
import HttpException from '../validation/HttpException';
import ILoginRepository from './ILoginRepository.interface';
import Login from '../entities/login/Login';

export default class LoginRepository implements ILoginRepository {
  constructor(private model = UsersModel) { }

  async getByEmail(user: Login): Promise<UsersModel> {
    const getUser = await this.model.findOne({ where: { email: user.email } });
    if (!getUser) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }
    return getUser;
  }
}
