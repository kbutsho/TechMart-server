import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ProductValidation } from './product.validation';
import { ProductController } from './product.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../../../helpers/enums';
const router = express.Router();

router.post('/', validateRequest(ProductValidation.productZodSchema), ProductController.createProduct);
router.get('/:id', ProductController.getSingleProduct);
router.patch('/:id', auth(USER_ROLE.SELLER, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), validateRequest(ProductValidation.productZodSchema), ProductController.updateProduct);
router.delete('/:id', auth(USER_ROLE.SELLER, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), ProductController.deleteProduct)
router.get('/', ProductController.getAllProduct)

export const ProductRoutes = router;
