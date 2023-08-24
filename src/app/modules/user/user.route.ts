import express from 'express';
import { UserController } from './user.controller';
import { USER_ROLE } from '../../../helpers/enums';
import auth from '../../middleware/auth';

const router = express.Router();

router.get('/profile', auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.SELLER, USER_ROLE.CUSTOMER), UserController.profileInfo);

export const UserRoutes = router;
