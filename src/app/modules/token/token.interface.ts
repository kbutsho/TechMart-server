import { Model, Types } from "mongoose";

export type IToken = {
  userId: Types.ObjectId,
  isVerified: Boolean,
  verification_token: string
}
export type TokenModel = Model<IToken, Record<string, unknown>>;