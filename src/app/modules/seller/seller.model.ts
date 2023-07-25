import { Schema, model } from "mongoose";
import { ISeller, SellerModel } from "./seller.interface";

const sellerSchema = new Schema<ISeller>({
  firstName: { type: String, required: true },
  lastName: { type: String },
  address: {
    country: { type: String },
    state: { type: String },
    city: { type: String },
    street: { type: String },
    zipCode: { type: String }
  },
  image: { type: String },
  phone: { type: String }
},
  { timestamps: true, toJSON: { virtuals: true } }
);

export const Seller = model<ISeller, SellerModel>('Seller', sellerSchema);
