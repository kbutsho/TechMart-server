import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { IPriceRange, IProduct } from "./product.interface";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { productFilterableFields } from "./product.constant";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";
import { ProductService } from "./product.service";

const createProduct: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { _id: sellerId } = req.user!
  console.log(sellerId)
  const result = await ProductService.createProduct(sellerId, req.body);
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
  const result = await ProductService.getAllProduct(filters, paginationOptions);
  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `found ${result.data.length} out of ${result.meta.total} products!`,
    meta: result.meta,
    data: result.data
  });
})

const getSellerAllProduct: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const { _id: sellerId } = req.user!
  const result = await ProductService.getSellerAllProduct(sellerId, filters, paginationOptions);
  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `found ${result.data.length} products!`,
    meta: result.meta,
    data: result.data
  });
})

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductService.getSingleProduct(id);
  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'product found successfully!',
    data: result
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id: productId } = req.params;
  const { userId: userId } = req.user!;
  const { role: userRole } = req.user!;
  const result = await ProductService.updateProduct(productId, userId, userRole, req.body);
  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'product updated successfully!',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id: productId } = req.params;
  const { userId: userId } = req.user!;
  const { role: userRole } = req.user!;
  const result = await ProductService.deleteProduct(productId, userId, userRole);
  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'product deleted successfully!',
    data: result
  });
});

const getPriceRange: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getPriceRange();
  sendResponse<IPriceRange>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `price range found!`,
    data: result
  });
})

export const ProductController = { getPriceRange, createProduct, getAllProduct, getSingleProduct, getSellerAllProduct, updateProduct, deleteProduct }