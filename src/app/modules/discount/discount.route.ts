import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { DiscountValidation } from './discount.validation';
import { DiscountController } from './discount.controller';
const router = express.Router();

router.post('/', validateRequest(DiscountValidation.discountZodSchema), DiscountController.createDiscount);
// router.get('/seller-products', auth(USER_ROLE.SELLER), ProductController.getSellerAllProduct)
// router.get('/:id', ProductController.getSingleProduct);
// router.patch('/:id', auth(USER_ROLE.SELLER, USER_ROLE.ADMIN, USER_ROLE.MANAGER), validateRequest(ProductValidation.productZodSchema), ProductController.updateProduct);
// router.delete('/:id', auth(USER_ROLE.SELLER, USER_ROLE.ADMIN, USER_ROLE.MANAGER), ProductController.deleteProduct)
// router.get('/', ProductController.getAllProduct)


export const DiscountRoutes = router;
