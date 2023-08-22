import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from '../user/user.validation';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post('/signup', validateRequest(UserValidation.createUser), AuthController.signup);
router.post('/login', validateRequest(AuthValidation.loginZodSchema), AuthController.login);
router.post('/login/google', validateRequest(AuthValidation.authServiceLoginZodSchema), AuthController.authServiceLogin);
router.get('/email', AuthController.sendEmail)

export const AuthRoutes = router;
