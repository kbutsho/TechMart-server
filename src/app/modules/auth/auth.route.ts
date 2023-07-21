import express from 'express';
import { UserValidation } from '../user/user.validation';
import { authController } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.post('/signup', validateRequest(UserValidation.createUser), authController.signup);
// router.post('/login', validateRequest(AuthValidation.loginZodSchema), AuthController.login);
// router.post('/refresh-token', validateRequest(AuthValidation.refreshTokenZodSchema), AuthController.refreshToken);

export const AuthRoutes = router;
