import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import httpStatus from "http-status";

const profileInfo = catchAsync(async (req: Request, res: Response) => {
  const { _id: userId } = req.user!;
  const result = await UserService.profileInfo(userId);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'profile information',
    data: result
  });
});

export const UserController = { profileInfo }