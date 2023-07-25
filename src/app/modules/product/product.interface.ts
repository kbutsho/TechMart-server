import { Model, Types } from "mongoose";

export type IProductStatus = "in-stock" | "stock-out" | "limited-stock" | "upcoming" | "discontinue";
export type IPriceUnit = "taka" | "usd" | "euro" | "rupi"

export type IProduct = {
  _id?: Types.ObjectId;
  productId: string;
  name: string;
  title: string;
  description: string;
  coverImage: string;
  featuredImages: string[];
  brandId: Types.ObjectId;
  brand: string;
  categoryId: Types.ObjectId;
  category: string;
  quantity: number;
  priceUnit: IPriceUnit;
  price: number;
  discountPrice?: number;
  discountCodes?: string[];
  couponCodes?: string[];
  color?: string;
  variant?: string;
  size?: string;
  status: IProductStatus;
  warranty: string;
  seller: Types.ObjectId
}

export type ProductModel = Model<IProduct, Record<string, unknown>>;
export type IProductFilters = {
  search?: string;
  name?: string;
  title?: string;
  description?: string;
  brand?: string;
  category?: string;
  price?: number;
  discountPrice?: number;
  color?: string;
  variant?: string;
  size?: string;
  status?: string;
  warranty?: string;
};