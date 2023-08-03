import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { DiscountModel, IDiscount } from "./discount.interface";
import { discountStatus, discountType } from "./discount.constant";

const discountSchema = new Schema<IDiscount>({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: discountType
  },
  amount: {
    type: Number,
    required: true
  },
  productIds: {
    type: [Schema.Types.ObjectId],
    ref: "Product",
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: discountStatus
  },
  seller: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Seller"
  }
},
  { timestamps: true, toJSON: { virtuals: true } }
);
discountSchema.plugin(uniqueValidator, { message: "{PATH} already exist!" });

export const Discount = model<IDiscount, DiscountModel>('Discount', discountSchema);
