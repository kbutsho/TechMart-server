import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { Seller } from "../seller/seller.model";
import { Types } from "mongoose";
import { Customer } from "../customer/customer.model";
import { ILogin, ILoginUserResponse, ISignup } from "./auth.interface";
import { USER_ROLE, USER_STATUS } from "../../../helpers/enums";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { ISeller } from "../seller/seller.interface";
import { ICustomer } from "../customer/customer.interface";
import { Admin } from "../admin/admin.model";


const signup = async (data: ISignup): Promise<IUser | null> => {
  const isUserExist = await User.findOne({ email: data.email });
  let userObjectId: Types.ObjectId | null = null;
  if (isUserExist) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "email already exist!")
  }
  if (data.role === USER_ROLE.SELLER || data.role === USER_ROLE.CUSTOMER) {
    if (data.role === USER_ROLE.SELLER) {
      const seller = await Seller.create({
        firstName: data.firstName, lastName: data.lastName, image: null, phone: null
      });
      userObjectId = seller._id;
    }
    else {
      const customer = await Customer.create({
        firstName: data.firstName, lastName: data.lastName, image: null, phone: null
      });
      userObjectId = customer._id;
    }
    const { firstName, lastName, ...userData } = data;
    const newData: IUser = {
      ...userData, userId: userObjectId, isAuthService: false,
      status: data.role === USER_ROLE.SELLER ? USER_STATUS.PENDING : USER_STATUS.ACTIVE
    };
    const user = await User.create(newData);
    const result = await User.findById(user._id);
    return result;
  } else {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "invalid role!")
  }
}

const login = async (data: ILogin): Promise<ILoginUserResponse> => {
  const isUserExist = await User.isUserExist(data.email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not exist!');
  }
  if (isUserExist.password &&
    !(await User.isPasswordMatched(data.password, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect!');
  }
  // create access token
  const { userId, email, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, email, role }, config.jwt.secret as Secret, config.jwt.expires_in as string
  );
  // create refresh token
  const refreshToken = jwtHelpers.createToken(
    { userId, email, role }, config.jwt.refresh_secret as Secret, config.jwt.refresh_expires_in as string
  );
  return { accessToken, refreshToken }
};

const loginWithService = async (data: ISignup): Promise<ILoginUserResponse> => {
  const isUserExist = await User.findOne({ email: data.email })
  let userObjectId: Types.ObjectId | null = null;
  if (data.isAuthService) {
    if (!isUserExist) {
      if (data.role === USER_ROLE.SELLER) {
        const seller: ISeller = await Seller.create({
          firstName: data.firstName, lastName: data.lastName ? data.lastName : null, image: null, phone: null
        });
        userObjectId = seller._id;
      }
      else {
        const customer: ICustomer = await Customer.create({
          firstName: data.firstName, lastName: data.lastName, image: null, phone: null
        });
        userObjectId = customer._id;
      }
      const { firstName, lastName, ...userData } = data;
      const newData: IUser = {
        ...userData, userId: userObjectId, password: null,
        status: data.role === USER_ROLE.SELLER ? USER_STATUS.PENDING : USER_STATUS.ACTIVE
      };
      const user = await User.create(newData);
      const { userId, email, role } = user;
      const accessToken = jwtHelpers.createToken(
        { userId, email, role }, config.jwt.secret as Secret, config.jwt.expires_in as string
      );
      // create refresh token
      const refreshToken = jwtHelpers.createToken(
        { userId, email, role }, config.jwt.refresh_secret as Secret, config.jwt.refresh_expires_in as string
      );
      return { accessToken, refreshToken }
    } else {
      if (data.lastName) {
        if (data.role === USER_ROLE.ADMIN) {
          await Admin.findOneAndUpdate({ _id: isUserExist.userId }, { lastName: data.lastName })
        } if (data.role === USER_ROLE.SUPER_ADMIN) {
          // await SuperAdmin.findOneAndUpdate({ _id: isUserExist.userId }, { lastName: data.lastName })
        } if (data.role === USER_ROLE.SELLER) {
          await Seller.findOneAndUpdate({ _id: isUserExist.userId }, { lastName: data.lastName })
        } if (data.role === USER_ROLE.SELLER) {
          await Seller.findOneAndUpdate({ _id: isUserExist.userId }, { lastName: data.lastName })
        }
      }
      const { userId, email, role } = isUserExist;
      const accessToken = jwtHelpers.createToken(
        { userId, email, role }, config.jwt.secret as Secret, config.jwt.expires_in as string
      );
      // create refresh token
      const refreshToken = jwtHelpers.createToken(
        { userId, email, role }, config.jwt.refresh_secret as Secret, config.jwt.refresh_expires_in as string
      );
      return { accessToken, refreshToken }
    }
  } else {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "auth service error!")
  }
}


export const AuthService = {
  signup, login, loginWithService
}
