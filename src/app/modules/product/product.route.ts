import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ProductValidation } from './product.validation';
import { ProductController } from './product.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../../../helpers/enums';
const router = express.Router();

router.post('/', validateRequest(ProductValidation.productZodSchema), auth(USER_ROLE.SELLER), ProductController.createProduct);
router.get('/price-range', ProductController.getPriceRange)
router.get('/seller-products', auth(USER_ROLE.SELLER), ProductController.getSellerAllProduct)
router.get('/:id', ProductController.getSingleProduct);
router.patch('/:id', validateRequest(ProductValidation.productZodSchema), ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct)
router.get('/', ProductController.getAllProduct)


export const ProductRoutes = router;
