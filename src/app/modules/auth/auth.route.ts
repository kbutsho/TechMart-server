import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from '../user/user.validation';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { ResetPasswordValidation } from '../reset-password/validation.resetPassword';

const router = express.Router();

router.post('/signup', validateRequest(UserValidation.createUser), AuthController.signup);
router.post('/login', validateRequest(AuthValidation.loginZodSchema), AuthController.login);
router.post('/login/google', validateRequest(AuthValidation.authServiceLoginZodSchema), AuthController.authServiceLogin);
router.post('/send-email', validateRequest(ResetPasswordValidation.sendEmail), AuthController.sendEmail);
router.post('/reset-password', validateRequest(ResetPasswordValidation.resetPassword), AuthController.resetPassword);
router.get('/:userId/token/:token', AuthController.verifyEmail);


export const AuthRoutes = router;
