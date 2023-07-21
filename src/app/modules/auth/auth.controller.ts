import { Request, RequestHandler, Response } from "express";
import { AuthService } from "./auth.service";
import { IUser } from "../user/user.interface";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";


const signup: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signup(req.body);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'signup successfully!',
    data: result
  });
});

export const authController = {
  signup
}