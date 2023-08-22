import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';
import { ICustomer } from '../customer/customer.interface';
import { ISeller } from '../seller/seller.interface';
import { IManager } from '../manager/manager.interface';

export type IUserRole = "admin" | "manager" | "seller" | "customer";
export type IUserStatus = "pending" | "active" | "block" | "inactive"

export type IUser = {
  _id?: Types.ObjectId;
  userId: Types.ObjectId | IAdmin | ICustomer | ISeller | IManager;
  email: string;
  role: IUserRole;
  password: string | null;
  confirmPassword: string | null;
  status: IUserStatus;
  isAuthService: boolean;
}

export type UserModel = {
  isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
} & Model<IUser>;