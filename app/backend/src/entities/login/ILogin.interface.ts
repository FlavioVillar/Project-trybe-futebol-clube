export interface ILogin {
  email: string;
}

export interface ILoginResponse extends ILogin {
  token: string;
}

// data transfer object
export interface ILoginDTO extends ILoginResponse {
  role: string;
}
