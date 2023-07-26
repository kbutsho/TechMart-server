import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { BrandModel, IBrand } from "./brand.interface";
import { brandStatus } from "./brand.constant";

const brandSchema = new Schema<IBrand>({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
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
  status: {
    type: String,
    required: true,
    enum: brandStatus
  }
},
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
)

brandSchema.plugin(uniqueValidator, { message: "{PATH} already exist!" });

export const Brand = model<IBrand, BrandModel>('Brand', brandSchema);
