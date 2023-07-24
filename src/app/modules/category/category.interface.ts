import { Model, Types } from "mongoose";

export type ICategoryStatus = "active" | "inactive" | "coming-soon" | "under-review" | "discontinue"

export type ICategory = {
  _id?: Types.ObjectId;
  categoryId: string;
  name: string;
  title: string;
  description: string;
  image: string;
  status: ICategoryStatus;
}
export interface ICategoryData extends Omit<ICategory, '_id' | '__v' | 'createdAt' | 'updatedAt'> { }
export type CategoryModel = Model<ICategory, Record<string, unknown>>;
export type ICategoryFilters = { search?: string; categoryId?: string, name?: string };

