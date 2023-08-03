import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { BrandRoutes } from '../modules/brand/brand.route';
import { ProductRoutes } from '../modules/product/product.route';
import { DiscountRoutes } from '../modules/discount/discount.route';

const router = express.Router();

const moduleRoutes = [
  { path: '/auth', route: AuthRoutes },
  { path: '/categories', route: CategoryRoutes },
  { path: '/brands', route: BrandRoutes },
  { path: '/products', route: ProductRoutes },
  { path: '/discounts', route: DiscountRoutes },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
