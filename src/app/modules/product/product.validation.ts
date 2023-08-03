import { z } from 'zod';
import { discountStatus, priceUnit, productStatus } from './product.constant';
import { IPriceUnit, IProductStatus } from './product.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { COUPON_STATUS, COUPON_TYPE, DISCOUNT_STATUS, DISCOUNT_TYPE } from '../../../helpers/enums';

const productZodSchema = z.object({
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
    title: z.string({
      required_error: 'title is required!'
    }).refine((value) => value.trim() !== '', {
      message: `title cannot be empty!`,
    }),
    description: z.string({
      required_error: 'description is required!'
    }).refine((value) => value.trim() !== '', {
      message: `description cannot be empty!`,
    }),
    featuredPhotos: z.array(z.any(), {
      required_error: "featured photo is required!"
    }).refine((data) => {
      if (data.length < 2) {
        throw new ApiError(httpStatus.BAD_REQUEST, "upload at least 2 photos!");
      }
      if (data.length > 5) {
        throw new ApiError(httpStatus.BAD_REQUEST, "photo should not exceed 5!");
      }
      if (data.some((photo) => typeof (photo) !== 'string')) {
        throw new ApiError(httpStatus.BAD_REQUEST, "urls should be string!");
      }
      if (data.some((photo) => photo.trim() === "")) {
        throw new ApiError(httpStatus.BAD_REQUEST, "photo urls should not be empty!");
      }
      return true;
    }),
    brandId: z.string({
      required_error: 'brand id is required!'
    }).refine((value) => value.trim() !== '', {
      message: `brand id cannot be empty!`,
    }),
    brand: z.string({
      required_error: 'brand is required!'
    }).refine((value) => value.trim() !== '', {
      message: `brand cannot be empty!`,
    }),
    categoryId: z.string({
      required_error: 'category id is required!'
    }).refine((value) => value.trim() !== '', {
      message: `category id cannot be empty!`,
    }),
    category: z.string({
      required_error: 'category is required!'
    }).refine((value) => value.trim() !== '', {
      message: `category cannot be empty!`,
    }),
    priceUnit: z.string({
      required_error: 'price unit is required!'
    }).refine((value) => priceUnit.includes(value as IPriceUnit), {
      message: `price unit should be ${priceUnit.join(', ').replace(/,([^,]*)$/, ' or$1')}`,
    }),
    price: z.number({
      required_error: 'price is required!'
    }),
    quantity: z.number({
      required_error: 'quantity is required!'
    }),
    status: z.string({
      required_error: 'status is required!'
    }).refine((value) => productStatus.includes(value as IProductStatus), {
      message: `status should be ${productStatus.join(', ').replace(/,([^,]*)$/, ' or$1')}`,
    }),
    warranty: z.string({
      required_error: 'warranty is required!'
    }).refine((value) => value.trim() !== '', {
      message: `warranty cannot be empty!`,
    }),
    seller: z.string({
      required_error: 'seller id is required!'
    }).refine((value) => value.trim() !== '', {
      message: `seller id cannot be empty!`,
    }),
    discountPrice: z.number().optional(),
    discountCodes: z.array(
      z.object({
        code: z.string({
          required_error: 'discount code is required!'
        }),
        discountId: z.string({
          required_error: 'discount id is required'
        }),
        status: z.enum([DISCOUNT_STATUS.ACTIVE, DISCOUNT_STATUS.END, DISCOUNT_STATUS.INACTIVE]),
        type: z.enum([DISCOUNT_TYPE.FIXED, DISCOUNT_TYPE.PERCENTAGE, DISCOUNT_TYPE.FREE_SHIPPING]),
        amount: z.number({
          required_error: 'discount amount is required!'
        }),
      })
    ).optional(),
    couponCodes: z.array(
      z.object({
        code: z.string({
          required_error: 'discount code is required!'
        }),
        couponCode: z.string({
          required_error: 'discount id is required'
        }),
        status: z.enum([COUPON_STATUS.ACTIVE, DISCOUNT_STATUS.END, DISCOUNT_STATUS.INACTIVE]),
        type: z.enum([COUPON_TYPE.FIXED, DISCOUNT_TYPE.PERCENTAGE, DISCOUNT_TYPE.FREE_SHIPPING]),
        amount: z.number({
          required_error: 'discount amount is required!'
        }),
      })
    ).optional(),
    size: z.string().optional(),
    color: z.string().optional(),
    variant: z.string().optional()
  })
});

export const ProductValidation = {
  productZodSchema
};
