import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IProduct, ProductModel } from "./product.interface";
import { priceUnit, productStatus } from "./product.constant";

const productSchema = new Schema<IProduct>({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  coverPhoto: {
    type: String,
    required: true
  },
  featuredPhotos: {
    type: [String],
    required: true
  },
  brandId: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  priceUnit: {
    type: String,
    required: true,
    enum: priceUnit
  },
  price: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number
  },
  discountCodes: {
    type: [String]
  },
  couponCodes: {
    type: [String]
  },
  color: {
    type: String
  },
  variant: {
    type: String
  },
  size: {
    type: String
  },
  status: {
    type: String,
    required: true,
    enum: productStatus
  },
  warranty: {
    type: String,
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Seller"
  }
},
  { timestamps: true, toJSON: { virtuals: true } }
);
productSchema.plugin(uniqueValidator, { message: "{PATH} already exist!" });

export const Product = model<IProduct, ProductModel>('Product', productSchema);
