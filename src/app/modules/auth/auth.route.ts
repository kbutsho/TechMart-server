import express from 'express';
import { UserValidation } from '../user/user.validation';
import { AuthController } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post('/signup', validateRequest(UserValidation.createUser), AuthController.signup);
router.post('/login', validateRequest(AuthValidation.loginZodSchema), AuthController.login);
router.post('/login-service', validateRequest(AuthValidation.loginWithServiceZodSchema), AuthController.loginWithService);

export const AuthRoutes = router;
