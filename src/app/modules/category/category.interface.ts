import { Model, Types } from "mongoose";

export type ICategoryStatus = "active" | "inactive" | "coming-soon" | "under-review" | "discontinue"

export type ICategory = {
  categoryId: string;
  name: string;
  title: string;
  description: string;
  image: string;
  status: ICategoryStatus;
}

export type CategoryModel = Model<ICategory, Record<string, unknown>>;
export type ICategoryFilters = { search?: string; categoryId?: string, name?: string };

