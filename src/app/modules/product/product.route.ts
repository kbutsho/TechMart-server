import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ProductValidation } from './product.validation';
import { ProductController } from './product.controller';
const router = express.Router();

router.post('/', validateRequest(ProductValidation.productZodSchema), ProductController.createProduct);
// router.get('/:id', BrandController.getSingleBrand);
// router.patch('/:id', validateRequest(BrandValidation.brandZodSchema), auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), BrandController.updateBrand);
// router.delete('/:id', auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), BrandController.deleteBrand)
router.get('/', ProductController.getAllProduct)

export const ProductRoutes = router;
