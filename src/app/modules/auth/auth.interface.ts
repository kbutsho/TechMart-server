import { IUserRole, IUserStatus } from "../user/user.interface";

export type ISignup = {
  firstName: string,
  lastName: string
  email: string;
  phone: string;
  role: IUserRole;
  password: string;
}

export type ILogin = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  role: string;
  accessToken: string;
  refreshToken?: string
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
