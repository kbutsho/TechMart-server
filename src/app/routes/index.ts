import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { BrandRoutes } from '../modules/brand/brand.route';

const router = express.Router();

const moduleRoutes = [
  { path: '/auth', route: AuthRoutes },
  { path: '/categories', route: CategoryRoutes },
  { path: '/brands', route: BrandRoutes },

];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
