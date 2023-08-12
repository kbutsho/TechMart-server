import { Model, Types } from "mongoose";

export type IProductStatus = "in-stock" | "stock-out" | "limited-stock" | "upcoming" | "discontinue";
export type IPriceUnit = "taka" | "usd" | "euro" | "rupi"
export type IDiscountStatus = "active" | "inactive" | "end";
export type ICouponStatus = "active" | "inactive" | "end";
export type IDiscountType = "percentage" | "fixed" | "free-shipping"
export type ICouponType = "percentage" | "fixed" | "free-shipping"
interface IDiscount {
  discountId: Types.ObjectId;
  code: string;
  status: IDiscountStatus;
  type: IDiscountType;
  amount: number;
}
interface ICoupon {
  couponId: Types.ObjectId;
  code: string;
  status: ICouponStatus;
  type: ICouponType;
  amount: number;
}

interface IReview {
  customerId: Types.ObjectId;
  comment?: string,
  rating: number,
  photos?: string[]
}

export type IProduct = {
  _id?: Types.ObjectId;
  code: string;
  name: string;
  title: string;
  description: string;
  coverPhoto: string;
  featuredPhotos: string[];
  features: {
    [key: string]: any;
  };
  brandId: Types.ObjectId;
  brand: string;
  categoryId: Types.ObjectId;
  category: string;
  quantity: number;
  priceUnit: IPriceUnit;
  price: number;
  discountPrice?: number;
  discountCodes?: IDiscount[];
  couponCodes?: ICoupon[];
  color?: string;
  variant?: string;
  size?: string;
  status: IProductStatus;
  warranty: string;
  reviews?: IReview;
  rating?: number;
  seller: Types.ObjectId;
  sellCount?: number
}

export type ProductModel = Model<IProduct, Record<string, unknown>>;
export type IProductFilters = {
  search?: string;
  maxPrice?: number;
  minPrice?: number;
  price?: number;
  size?: string;
  color?: string;
  variant?: string;
  name?: string;
  title?: string;
  description?: string;
  brand?: string;
  category?: string;
  status?: string;
  warranty?: string;
};

export type IPriceRange = number[] | []