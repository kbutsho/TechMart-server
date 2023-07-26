import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { productSearchableFields } from "./product.constant";
import { IProduct, IProductFilters } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (data: IProduct): Promise<IProduct | null> => {
  const { discountPrice, size, color, variant, ...others } = data;
  const result = await Product.create({
    ...others,
    size: size ?? "undefine",
    color: color ?? "undefine",
    variant: variant ?? "undefine",
    discountPrice: discountPrice ?? data.price
  })
  return result;
}

const getAllProduct = async (filters: IProductFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IProduct[]>> => {
  const { search, minPrice, maxPrice, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);
  const andConditions = [];
  if (search) {
    andConditions.push({
      $or: productSearchableFields.map((field) => ({
        [field]: {
          $regex: search,
          $options: 'i',
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
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  if (minPrice) {
    andConditions.push(
      { price: { $gte: minPrice } }
    );
  } if (maxPrice) {
    andConditions.push(
      { price: { $lte: maxPrice } }
    );
  }
  const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Product.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments();
  return {
    meta: { page, limit, total },
    data: result,
  };
};

export const productService = { createProduct, getAllProduct }
