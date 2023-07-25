import { Model, Types } from "mongoose";

export type IBrandStatus = "active" | "inactive" | "coming-soon" | "under-review" | "discontinue"

export type IBrand = {
  _id?: Types.ObjectId;
  brandId: string;
  name: string;
  title: string;
  description: string;
  image: string;
  status: IBrandStatus;
}

export type BrandModel = Model<IBrand, Record<string, unknown>>;
export type IBrandFilters = { search?: string; brandId?: string, name?: string };