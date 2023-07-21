import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { userRole, userStatus } from "../user/user.constant";
import { Seller } from "../seller/seller.model";
import { Types } from "mongoose";
import { Customer } from "../customer/customer.model";
import { ISignup } from "./auth.interface";
import { USER_ROLE, USER_STATUS } from "../../../helpers/enums";


const signup = async (data: ISignup): Promise<IUser | null> => {
  const isExist = await User.findOne({ email: data.email });
  if (isExist) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "email already exist!")
  }
  if (data.role === USER_ROLE.SELLER || data.role === USER_ROLE.CUSTOMER) {
    let userId: Types.ObjectId | null = null;
    if (data.role === USER_ROLE.SELLER) {
      const seller = await Seller.create({
        firstName: data.firstName,
        lastName: data.lastName,
        image: null,
        phone: null
      });
      userId = seller._id;
    }
    else {
      const customer = await Customer.create({
        firstName: data.firstName,
        lastName: data.lastName,
        image: null,
        phone: null
      });
      userId = customer._id;
    }
    const { firstName, lastName, ...userData } = data;
    const newData: IUser = {
      ...userData,
      userId: userId,
      status: data.role === USER_ROLE.SELLER ? USER_STATUS.PENDING : USER_STATUS.ACTIVE
    };
    const user = await User.create(newData);
    const result = await User.findById(user._id);
    return result;
  } else {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "role not exist!")
  }
}

export const AuthService = {
  signup
}
