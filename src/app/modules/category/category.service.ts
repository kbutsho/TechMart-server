import { Types } from "mongoose";
import { categorySearchableFields } from "./category.constant";
import { ICategory, ICategoryFilters } from "./category.interface";
import { Category } from "./category.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { isEqual, omit } from "lodash";

const addCategory = async (data: ICategory): Promise<ICategory | null> => {
  const result = await Category.create(data)
  return result;
}

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

const updateCategory = async (data: ICategory): Promise<ICategory | null> => {
  const category: ICategory | null = await Category.findOne({ _id: data._id });
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found!');
  } else {
    const categoryToCompare = omit((category as any).toObject(), ["createdAt", "updatedAt", "__v", "_id"]);
    const dataToCompare = omit(data, ["_id"]);
    if (isEqual(categoryToCompare, dataToCompare)) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Category is already up to date!');
    }
    else {
      try {
        const result: ICategory | null = await Category.findOneAndUpdate({ _id: data._id }, data, { new: true });
        return result;
      } catch (error: any) {
        if (error.code === 11000) {
          const duplicateField = Object.keys(error.keyValue)[0];
          throw new ApiError(httpStatus.BAD_REQUEST, `${duplicateField} already exists!`);
        }
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
      }
    }
  }
};


export const CategoryService = { addCategory, getAllCategory, updateCategory }