import { StatusCodes } from 'http-status-codes';
import UsersModel from '../../database/models/user.model';
import HttpException from '../../validation/HttpException';
import ILoginRepository from './ILoginRepository.interface';
import { IUser } from '../../interfaces/IUser.interface';

export default class LoginRepository implements ILoginRepository {
  constructor(private model = UsersModel) { }

  async getByEmail(user: IUser): Promise<IUser> {
    const getUser = await this.model.findOne({ where: { email: user.email } });
    if (!getUser) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }
    return getUser;
  }
}
