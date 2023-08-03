import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { DiscountService } from "./discount.service";
import { IDiscount } from "./discount.interface";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createDiscount: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await DiscountService.createDiscount(req.body);
  sendResponse<IDiscount>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'discount created successfully!',
    data: result
  });
});

export const DiscountController = { createDiscount }