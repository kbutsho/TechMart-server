import { IDiscountStatus, IDiscountType } from "./discount.interface";

export const discountType: IDiscountType[] = ["percentage", "fixed", "free-shipping"];
export const discountStatus: IDiscountStatus[] = ["active", "inactive", "end"];