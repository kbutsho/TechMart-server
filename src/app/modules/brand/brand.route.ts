import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../../../helpers/enums';
import { BrandValidation } from './brand.validation';
import { BrandController } from './brand.controller';
const router = express.Router();

router.post('/', validateRequest(BrandValidation.brandZodSchema), auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), BrandController.createBrand);
router.get('/:id', BrandController.getSingleBrand);
router.patch('/:id', validateRequest(BrandValidation.brandZodSchema), auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), BrandController.updateBrand);
router.delete('/:id', auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), BrandController.deleteBrand)
router.get('/', BrandController.getAllBrand)

export const BrandRoutes = router;
