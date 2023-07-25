import { Types } from "mongoose";
import { categorySearchableFields } from "./category.constant";
import { ICategory, ICategoryFilters } from "./category.interface";
import { Category } from "./category.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { isEqual, pick } from "lodash";

const createCategory = async (data: ICategory): Promise<ICategory | null> => {
  const result = await Category.create(data)
  return result;
}

const getSingleCategory = async (id: string): Promise<ICategory | null> => {
  const result = await Category.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'category not found!')
  }
  return result;
};

const getAllCategory = async (filters: ICategoryFilters): Promise<ICategory[]> => {
  const { search, ...filtersData } = filters; // search = partial match, filter = exact match
  const andConditions = [];
  if (search) {
    andConditions.push({
      $or: categorySearchableFields.map(field => ({
        [field]: {
          $regex: search
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Category.find(whereConditions);
  return result;
}

const updateCategory = async (id: string, data: ICategory): Promise<ICategory | null> => {
  const category: ICategory | null = await Category.findOne({ _id: id });
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'category not found!');
  } else {
    const categoryToCompare = pick((category as any).toObject(), ["categoryId", "name", "title", "description", "image"]);
    const dataToCompare = pick(data, ["categoryId", "name", "title", "description", "image"]);
    if (isEqual(categoryToCompare, dataToCompare)) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'already upto date!');
    }
    else {
      const result: ICategory | null = await Category.findOneAndUpdate({ _id: id }, data, { new: true, runValidators: true });
      return result;
    }
  }
};

const deleteCategory = async (id: string): Promise<ICategory | null> => {
  const result = await Category.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'category not found!');
  }
  return result;
};

export const CategoryService = { createCategory, getSingleCategory, getAllCategory, updateCategory, deleteCategory }