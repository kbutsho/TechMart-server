import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from '../user/user.validation';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post('/signup', validateRequest(UserValidation.createUser), AuthController.signup);
router.post('/login', validateRequest(AuthValidation.loginZodSchema), AuthController.login);
router.post('/login/google', validateRequest(AuthValidation.loginWithGoogleZodSchema), AuthController.loginWithGoogle);
// admin 
router.post('/admin/signup', validateRequest(UserValidation.createUser), AuthController.adminSignup);
router.post('/admin/login/google', validateRequest(AuthValidation.loginWithGoogleZodSchema), AuthController.adminLoginWithGoogle);

export const AuthRoutes = router;
