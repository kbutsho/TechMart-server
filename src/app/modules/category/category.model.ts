import { Schema, model } from "mongoose";
import { CategoryModel, ICategory } from "./category.interface";
import { categoryStatus } from "./category.constant";
import uniqueValidator from "mongoose-unique-validator";

const categorySchema = new Schema<ICategory>(
  {
    categoryId: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: String, required: true, enum: categoryStatus }
  },
  {
    timestamps: true, toJSON: { virtuals: true }
  }
);
categorySchema.plugin(uniqueValidator, { message: "{PATH} already exist" });

export const Category = model<ICategory, CategoryModel>('Category', categorySchema);
