import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BrandService } from "./brand.service";
import { IBrand } from "./brand.interface";
import { brandFilterableFields } from "./brand.constant";
import pick from "../../../shared/pick";

const createBrand: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await BrandService.createBrand(req.body);
  sendResponse<IBrand>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'brand created successfully!',
    data: result
  });
});

const getSingleBrand = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BrandService.getSingleBrand(id);
  sendResponse<IBrand>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'brand found successfully!',
    data: result
  });
});

const getAllBrand: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, brandFilterableFields);
  const result = await BrandService.getAllBrand(filters);
  sendResponse<IBrand[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result.length} brands found!`,
    data: result
  });
})

const updateBrand = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BrandService.updateBrand(id, req.body);
  sendResponse<IBrand>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'brand updated successfully!',
    data: result,
  });
});

const deleteBrand = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BrandService.deleteBrand(id);
  sendResponse<IBrand>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'brand deleted successfully!',
    data: result
  });
});

export const BrandController = { createBrand, getSingleBrand, getAllBrand, updateBrand, deleteBrand }