import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';
import { ICustomer } from '../customer/customer.interface';
import { ISeller } from '../seller/seller.interface';

export type IUserRole = "super-admin" | "admin" | "seller" | "customer";
export type IUserStatus = "pending" | "active" | "block" | "inactive"

export type IUser = {
  userId: Types.ObjectId | IAdmin | ICustomer | ISeller;
  email: string;
  role: IUserRole;
  password: string | null;
  status: IUserStatus;
  isAuthService: boolean;
}

export type UserModel = {
  isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
} & Model<IUser>;