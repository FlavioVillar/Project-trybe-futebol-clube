import * as bcrypt from 'bcryptjs';

export default class PasswordService {
  static async gerarPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
