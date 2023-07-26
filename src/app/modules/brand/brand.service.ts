import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IBrand, IBrandFilters } from "./brand.interface";
import { Brand } from "./brand.model";
import { brandSearchableFields } from "./brand.constant";
import { isEqual, pick } from "lodash";
import { Product } from "../product/product.model";

const createBrand = async (data: IBrand): Promise<IBrand | null> => {
  const result = await Brand.create(data)
  return result;
}

const getSingleBrand = async (id: string): Promise<IBrand | null> => {
  const result = await Brand.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'brand not found!')
  }
  return result;
};

const getAllBrand = async (filters: IBrandFilters): Promise<IBrand[]> => {
  const { search, ...filtersData } = filters;
  const andConditions = [];
  if (search) {
    andConditions.push({
      $or: brandSearchableFields.map(field => ({
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
  const result = await Brand.find(whereConditions);
  return result;
}

const updateBrand = async (id: string, data: IBrand): Promise<IBrand | null> => {
  const brand: IBrand | null = await Brand.findOne({ _id: id });
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'brand not found!');
  } else {
    const brandToCompare = pick((brand as any).toObject(), ["code", "name", "title", "description", "coverPhoto", "status"]);
    const dataToCompare = pick(data, ["code", "name", "title", "description", "coverPhoto", "status"]);
    if (isEqual(brandToCompare, dataToCompare)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'already upto date!');
    }
    else {
      const result: IBrand | null = await Brand.findOneAndUpdate({ _id: id }, data, { new: true, runValidators: true });
      await Product.updateMany({ brandId: id }, { brand: data.name });
      return result;
    }
  }
};

const deleteBrand = async (id: string): Promise<IBrand | null> => {
  const product = await Product.find({ brandId: id });
  if (product.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST,
      `brand has ${product.length} products. delete them first!`);
  } else {
    const result = await Brand.findByIdAndDelete(id);
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, 'brand not found!');
    }
    return result;
  }
};

export const BrandService = { createBrand, getSingleBrand, getAllBrand, updateBrand, deleteBrand }