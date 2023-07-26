import { IPriceUnit, IProductStatus } from "./product.interface";

export const productStatus: IProductStatus[] = ["in-stock", "stock-out", "limited-stock", "upcoming", "discontinue"];
export const priceUnit: IPriceUnit[] = ["taka", "usd", "euro", "rupi"];
export const productFilterableFields = [
  'search',
  'name',
  'brand',
  'category',
  'status',
  'color',
  'variant',
  'size',
  'price',
  'maxPrice',
  'minPrice'
];
export const productSearchableFields = [
  'name',
  'title',
  'description',
  'brand',
  'category',
  'status',
  'warranty',
  'color',
  'size',
  'variant'
];