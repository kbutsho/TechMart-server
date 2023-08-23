import { Model, Types } from "mongoose";

export type IResetPassword = {
  userId: Types.ObjectId,
  isVerified: Boolean,
  verification_token: string
}
export type ResetPasswordModel = Model<IResetPassword, Record<string, unknown>>;