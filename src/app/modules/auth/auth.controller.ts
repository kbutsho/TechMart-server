import { Request, RequestHandler, Response } from "express";
import { AuthService } from "./auth.service";
import { IUser } from "../user/user.interface";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import config from "../../../config";
import { ILoginUserResponse } from "./auth.interface";


const signup: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signup(req.body);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'verification message has been sent to your email!',
    data: result
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.login(loginData);
  const { refreshToken, ...others } = result;
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'login successfully!',
    data: others
  });
});

const authServiceLogin = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await AuthService.authServiceLogin(data);
  const { refreshToken, ...others } = result;
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'login successfully!',
    data: others
  });
});

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  const { userId, token } = req.params;
  await AuthService.verifyEmail(userId, token);
  res.status(200).send({
    success: true,
    message: 'email verification successful!'
  })
});

const sendEmail = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body
  await AuthService.sendEmail(email);
  res.status(200).send({
    success: true,
    message: 'verification message has been sent to your email!'
  })
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { userId, token, password } = req.body
  await AuthService.resetPassword(userId, token, password);
  res.status(200).send({
    success: true,
    message: 'password reset successfully!'
  })
});



export const AuthController = {
  signup, login, authServiceLogin, verifyEmail, sendEmail, resetPassword
}