import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Product } from "../product/product.model";
import { IDiscount } from "./discount.interface";
import { Discount } from "./discount.model";
import { DISCOUNT_TYPE } from "../../../helpers/enums";

const createDiscount = async (data: IDiscount): Promise<IDiscount | null> => {
  const discount: IDiscount = await Discount.create(data)

  for (const productId of discount.productIds) {
    try {
      const product = await Product.findById(productId);
      if (product) {
        let discountAmount: number = discount.amount;
        let discountPrice = product.price;
        if (discount.type === DISCOUNT_TYPE.FIXED) {
          discountPrice = discountPrice - discountAmount;
        }
        if (discount.type === DISCOUNT_TYPE.PERCENTAGE) {
          discountAmount = (discount.amount * product.price) / 100
          discountPrice = discountPrice - discountAmount
        }
        if (discount.type === DISCOUNT_TYPE.FREE_SHIPPING) {
          discountAmount = 0
          discountPrice = product.price;
        }

        // update product
        product.discountPrice = discountPrice;
        const newDiscountCode = {
          discountId: discount._id!,
          code: discount.code,
          status: discount.status,
          amount: discountAmount,
          type: discount.type,
        };
        product.discountCodes!.push(newDiscountCode);
        await product.save();
      }
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Error updating product ${productId}: ${error}`);
    }
  }
  return discount;
}

export const DiscountService = { createDiscount }

