import { Model } from 'mongoose';

export type IUserRole = "admin" | "manager" | "seller" | "customer";
export type IUserStatus = "pending" | "active" | "block" | "inactive"

export type IUser = {
  email: string;
  role: IUserRole;
  firstName: string;
  lastName: string | null;
  phone: string | null;
  address?: {
    country: string;
    state: string;
    city: string;
    street: string;
    zipCode: string;
  };
  image?: string;
  password: string | null;
  status: IUserStatus;
  isAuthService: boolean;
  isVerified: boolean
}

export type UserModel = {
  isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
} & Model<IUser>;