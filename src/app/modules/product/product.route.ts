import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ProductValidation } from './product.validation';
import { ProductController } from './product.controller';
const router = express.Router();

router.post('/', validateRequest(ProductValidation.productZodSchema), ProductController.createProduct);
router.get('/seller-products', ProductController.getSellerAllProduct)
router.get('/:id', ProductController.getSingleProduct);
router.patch('/:id', validateRequest(ProductValidation.productZodSchema), ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct)
router.get('/', ProductController.getAllProduct)


export const ProductRoutes = router;
