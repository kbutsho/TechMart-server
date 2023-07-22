import { IUserRole, IUserStatus } from "../user/user.interface";

export type ISignup = {
  firstName: string,
  lastName: string
  email: string;
  role: IUserRole;
  password: string;
  status: IUserStatus;
  isAuthService: boolean;
}

export type ILogin = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
