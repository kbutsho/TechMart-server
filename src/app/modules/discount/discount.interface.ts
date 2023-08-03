import { Model, Types } from "mongoose";

export type IDiscountStatus = "active" | "inactive" | "end";
export type IDiscountType = "percentage" | "fixed" | "free-shipping"

export type IDiscount = {
  _id?: Types.ObjectId;
  code: string;
  name: string;
  description: string;
  type: IDiscountType;
  amount: number;
  productIds: Types.ObjectId[];
  startDate: Date;
  endDate: Date;
  status: IDiscountStatus;
  seller: Types.ObjectId;
}

export type DiscountModel = Model<IDiscount, Record<string, unknown>>;