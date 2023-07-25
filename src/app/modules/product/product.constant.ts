import { IPriceUnit, IProductStatus } from "./product.interface";

export const productStatus: IProductStatus[] = ["in-stock", "stock-out", "limited-stock", "upcoming", "discontinue"];
export const priceUnit: IPriceUnit[] = ["taka", "usd", "euro", "rupi"];
export const productFilterableFields = [
  'search',
  'name',
  'title',
  'description',
  'brand',
  'category',
  'price',
  'discountPrice',
  'color',
  'variant',
  'size',
  'status',
  'warranty'
];
export const productSearchableFields = [
  'name',
  'title',
  'description',
  'brand',
  'category',
  'price',
  'discountPrice',
  'color',
  'variant',
  'size',
  'status',
  'warranty'
];