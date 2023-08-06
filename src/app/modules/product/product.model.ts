import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IProduct, ProductModel } from "./product.interface";
import { couponStatus, couponType, discountStatus, discountType, priceUnit, productStatus } from "./product.constant";

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
  features: {
    type: Schema.Types.Mixed,
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
    type: [{
      discountId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: discountStatus,
        required: true,
      },
      type: {
        type: String,
        enum: discountType,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    }]
  },
  couponCodes: {
    type: [{
      couponId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: couponStatus,
        required: true,
      },
      type: {
        type: String,
        enum: couponType,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    }]
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
  reviews: {
    type: [{
      customerId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      comment: {
        type: String
      },
      rating: {
        type: Number,
        required: true,
      }
    }]
  },
  rating: {
    type: Number
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
