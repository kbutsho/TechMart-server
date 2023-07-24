import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { CategoryService } from "./category.service";
import sendResponse from "../../../shared/sendResponse";
import { ICategory } from "./category.interface";
import httpStatus from "http-status";
import { categoryFilterableFields } from "./category.constant";
import pick from "../../../shared/pick";

const addCategory: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.addCategory(req.body);
  sendResponse<ICategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category created successfully!',
    data: result
  });
});

const getAllCategory: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, categoryFilterableFields);
  const result = await CategoryService.getAllCategory(filters);
  sendResponse<ICategory[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result.length} category found!`,
    data: result
  });
})

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.updateCategory(req.body);
  sendResponse<ICategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category updated successfully!',
    data: result,
  });
});


export const CategoryController = { addCategory, getAllCategory, updateCategory }