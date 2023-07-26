import { Model, Types } from "mongoose";

export type ICategoryStatus = "active" | "inactive" | "coming-soon" | "under-review" | "discontinue"

export type ICategory = {
  _id?: Types.ObjectId;
  code: string;
  name: string;
  title: string;
  description: string;
  coverPhoto: string;
  status: ICategoryStatus;
}

export type CategoryModel = Model<ICategory, Record<string, unknown>>;
export type ICategoryFilters = { search?: string; name?: string };

