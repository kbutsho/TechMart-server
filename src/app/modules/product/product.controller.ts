import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { productService } from "./product.service";
import { IProduct } from "./product.interface";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { productFilterableFields } from "./product.constant";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";

const createProduct: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.createProduct(req.body);
  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'product created successfully!',
    data: result
  });
});

const getAllProduct: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await productService.getAllProduct(filters, paginationOptions);
  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `found ${result.data.length} out of ${result.meta.total} products!`,
    meta: result.meta,
    data: result.data
  });
})
// const getSingleBrand = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await BrandService.getSingleBrand(id);
//   sendResponse<IBrand>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'brand found successfully!',
//     data: result
//   });
// });

// const getAllBrand: RequestHandler = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, brandFilterableFields);
//   const result = await BrandService.getAllBrand(filters);
//   sendResponse<IBrand[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: `${result.length} brands found!`,
//     data: result
//   });
// })

// const updateBrand = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await BrandService.updateBrand(id, req.body);
//   sendResponse<IBrand>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'brand updated successfully!',
//     data: result,
//   });
// });

// const deleteBrand = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await BrandService.deleteBrand(id);
//   sendResponse<IBrand>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'brand deleted successfully!',
//     data: result
//   });
// });

export const ProductController = { createProduct, getAllProduct }