import { z } from 'zod';
import httpStatus from 'http-status';
import { COUPON_STATUS, COUPON_TYPE, DISCOUNT_STATUS, DISCOUNT_TYPE } from '../../../helpers/enums';
import { discountStatus, discountType } from './discount.constant';
import { IDiscountStatus, IDiscountType } from './discount.interface';
import ApiError from '../../../errors/ApiError';

const discountZodSchema = z.object({
  body: z.object({
    code: z.string({
      required_error: 'code is required!'
    }).refine((value) => value.trim() !== '', {
      message: `code cannot be empty!`,
    }),
    name: z.string({
      required_error: 'name is required!'
    }).refine((value) => value.trim() !== '', {
      message: `name cannot be empty!`,
    }),
    description: z.string({
      required_error: 'description is required!'
    }).refine((value) => value.trim() !== '', {
      message: `description cannot be empty!`,
    }),
    type: z.string({
      required_error: 'discount type is required!'
    }).refine((value) => discountType.includes(value as IDiscountType), {
      message: `discount type should be ${discountType.join(', ').replace(/,([^,]*)$/, ' or$1')}`,
    }),
    amount: z.number({
      required_error: 'discount amount is required!'
    }),
    productIds: z.array(z.string(), {
      required_error: "product is required!"
    }).refine((data) => {
      if (data.length < 1) {
        throw new ApiError(httpStatus.BAD_REQUEST, "add at least 1 product!");
      }
      if (data.some((product) => typeof (product) !== 'string')) {
        throw new ApiError(httpStatus.BAD_REQUEST, "ids should be string!");
      }
      if (data.some((product) => product.trim() === "")) {
        throw new ApiError(httpStatus.BAD_REQUEST, "id should not be empty!");
      }
      return true;
    }),
    startDate: z.string({
      required_error: 'start date is required!'
    }).refine((value) => value.trim() !== '', {
      message: `start date cannot be empty!`,
    }),
    endDate: z.string({
      required_error: 'end date is required!'
    }).refine((value) => value.trim() !== '', {
      message: `end date cannot be empty!`,
    }),
    status: z.string({
      required_error: 'status is required!'
    }).refine((value) => discountStatus.includes(value as IDiscountStatus), {
      message: `status should be ${discountStatus.join(', ').replace(/,([^,]*)$/, ' or$1')}`,
    }),
    seller: z.string({
      required_error: 'seller id is required!'
    }).refine((value) => value.trim() !== '', {
      message: `seller id cannot be empty!`,
    })
  })
});

export const DiscountValidation = {
  discountZodSchema
};
