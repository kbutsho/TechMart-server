import { categorySearchableFields } from "./category.constant";
import { ICategory, ICategoryFilters } from "./category.interface";
import { Category } from "./category.model";

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

export const CategoryService = { addCategory, getAllCategory }