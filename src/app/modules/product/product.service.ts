import mongoose, { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { productSearchableFields } from "./product.constant";
import { IProduct, IProductFilters } from "./product.interface";
import { Product } from "./product.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { isEqual, pick } from "lodash";
import { USER_ROLE } from "../../../helpers/enums";

const createProduct = async (data: IProduct): Promise<IProduct | null> => {
  const { discountPrice, size, color, variant, ...others } = data;
  const result = await Product.create({
    ...others,
    size: size ?? "unspecific",
    color: color ?? "unspecific",
    variant: variant ?? "unspecific",
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
        [field]: { $regex: search, $options: 'i' },
      }))
    })
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value
      }))
    })
  }
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
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
    data: result
  };
};

const getSingleProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'product not found!')
  }
  return result;
};

const updateProduct = async (productId: string, userId: string, userRole: string, data: IProduct): Promise<IProduct | null> => {
  const product: IProduct | null = await Product.findOne({ _id: productId });
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'product not found!');
  } else {
    const compareValues: string[] = [
      "code", "name", "title", "description", "coverPhoto",
      "featuredPhotos", "brandId", "categoryId", "brand",
      "category", "quantity", "priceUnit", "price", "discountPrice",
      "color", "variant", "size", "status", "warranty", "seller"
    ];
    const { seller, brandId, categoryId, color, size, variant, discountPrice, ...others } = data;
    const updatedData = {
      ...others,
      discountPrice: discountPrice ?? data.price,
      color: color ?? product.color,
      size: size ?? product.size,
      variant: variant ?? product.variant,
      seller: product.seller,
      brandId: new mongoose.Types.ObjectId(brandId),
      categoryId: new mongoose.Types.ObjectId(categoryId)
    }
    const dataToCompare = pick(updatedData, compareValues);
    const productToCompare = pick((product as any).toObject(), compareValues);
    if (isEqual(productToCompare, dataToCompare)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'already upto date!');
    }
    else {
      if (userRole === USER_ROLE.ADMIN || userRole === USER_ROLE.SUPER_ADMIN) {
        const result: IProduct | null = await Product.findOneAndUpdate(
          { _id: productId }, updatedData, { new: true, runValidators: true }
        )
        return result;
      } if (userRole === USER_ROLE.SELLER) {
        console.log(userId, product.seller.toString())
        if (userId === product.seller.toString()) {
          const result: IProduct | null = await Product.findOneAndUpdate(
            { _id: productId }, updatedData, { new: true, runValidators: true }
          )
          return result;
        } else {
          throw new ApiError(httpStatus.BAD_REQUEST, `you are not authorized seller of this product!`)
        }
      }
      else {
        throw new ApiError(httpStatus.BAD_REQUEST, `${userRole} is not authorized user!`)
      }
    }
  }
};

const deleteProduct = async (productId: string, userId: string, userRole: string): Promise<IProduct | null> => {
  // check order
  // check discounts
  // check coupons
  const product: IProduct | null = await Product.findById(productId);
  if (product) {
    if (userRole === USER_ROLE.SELLER) {
      if (userId === product.seller.toString()) {
        const result = await Product.findByIdAndDelete(productId);
        return result;
      } else {
        throw new ApiError(httpStatus.NOT_FOUND, 'you are not authorized of this product!')
      }
    }
    if (userRole === USER_ROLE.ADMIN || userRole === USER_ROLE.SUPER_ADMIN) {
      const result = await Product.findByIdAndDelete(productId);
      return result;
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, 'unauthorized user!')
    }
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'product not found!')
  }


};

export const ProductService = { createProduct, getAllProduct, getSingleProduct, updateProduct, deleteProduct }


