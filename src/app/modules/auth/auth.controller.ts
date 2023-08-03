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
    message: 'signup successfully!',
    data: result
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.login(loginData);
  const { refreshToken, ...accessToken } = result;
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'login successfully!',
    data: accessToken
  });
});

const authServiceLogin = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await AuthService.authServiceLogin(data);
  const { refreshToken, ...accessToken } = result;
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'login successfully!',
    data: accessToken
  });
});

export const AuthController = {
  signup, login, authServiceLogin
}