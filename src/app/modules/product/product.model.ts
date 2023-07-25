import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IProduct, ProductModel } from "./product.interface";
import { priceUnit, productStatus } from "./product.constant";

const productSchema = new Schema<IProduct>({
  productId: {
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
  coverImage: {
    type: String,
    required: true
  },
  featuredImages: {
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
  price: {
    type: Number,
    required: true
  },
  priceUnit: {
    type: String,
    required: true,
    enum: priceUnit
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
    type: Number
  },
  variant: {
    type: Number
  },
  size: {
    type: Number
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
