export interface ILoginService {
  login(email: string): Promise<string>;
  validate(token: string): Promise<{ role: string }>;
}
