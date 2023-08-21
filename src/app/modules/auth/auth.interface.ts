import { IUserRole, IUserStatus } from "../user/user.interface";

export type ISignup = {
  firstName: string,
  lastName: string
  email: string;
  role: IUserRole;
  password: string;
  status: IUserStatus;
  isAuthService: boolean;
  // isVerified: boolean
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
