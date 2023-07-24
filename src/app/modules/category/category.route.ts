import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CategoryValidation } from './category.validation';
import { CategoryController } from './category.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../../../helpers/enums';
const router = express.Router();

router.post('/add', validateRequest(CategoryValidation.categoryZodSchema), auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), CategoryController.addCategory);
// router.get('/:id', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER), CowController.getSingleCow);
router.patch('/update', validateRequest(CategoryValidation.categoryZodSchema), CategoryController.updateCategory);
// router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow)
router.get('/all', CategoryController.getAllCategory)

export const CategoryRoutes = router;
