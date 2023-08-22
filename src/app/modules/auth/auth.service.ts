import { emailSend } from './../../../helpers/sendEmail';
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import config from "../../../config";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { Seller } from "../seller/seller.model";
import mongoose, { Types } from "mongoose";
import { Customer } from "../customer/customer.model";
import { ILogin, ILoginUserResponse, ISignup } from "./auth.interface";
import { USER_ROLE, USER_STATUS } from "../../../helpers/enums";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import { ISeller } from "../seller/seller.interface";
import { ICustomer } from "../customer/customer.interface";
import { Admin } from "../admin/admin.model";
import { IAdmin } from "../admin/admin.interface";
import { Manager } from "../manager/manager.model";
import { IManager } from "../manager/manager.interface";
import { Token } from '../token/token.model';
import crypto from 'crypto';
// import nodemailer from 'nodemailer';

const signup = async (data: ISignup): Promise<IUser | null> => {
  const isUserExist: IUser | null = await User.findOne({ email: data.email });
  let userObjectId: Types.ObjectId | null = null;
  if (isUserExist) {
    throw new ApiError(httpStatus.CONFLICT, "email already exist!")
  }
  if (data.role === USER_ROLE.SELLER) {
    const seller = await Seller.create({
      image: null,
      phone: null,
      firstName: data.firstName,
      lastName: data.lastName
    });
    userObjectId = seller._id;
  }
  if (data.role === USER_ROLE.CUSTOMER) {
    const customer = await Customer.create({
      image: null,
      phone: null,
      firstName: data.firstName,
      lastName: data.lastName,
    });
    userObjectId = customer._id;
  }
  if (data.role === USER_ROLE.ADMIN) {
    const admin = await Admin.create({
      image: null,
      phone: null,
      firstName: data.firstName,
      lastName: data.lastName,
    });
    userObjectId = admin._id;
  }
  else {
    const manager = await Manager.create({
      image: null,
      phone: null,
      firstName: data.firstName,
      lastName: data.lastName,
    });
    userObjectId = manager._id;
  }
  const { firstName, lastName, ...userData } = data;
  const newData = {
    ...userData,
    userId: userObjectId,
    isAuthService: false,
    isVerified: false,
    status: data.role === USER_ROLE.CUSTOMER ? USER_STATUS.ACTIVE : USER_STATUS.PENDING
  };
  const user = await User.create(newData);
  const result = await User.findById(user._id).select('-password');


  // create email verification token and send email
  const createToken = await Token.create({
    userId: user._id,
    isVerified: false,
    verification_token: crypto.randomBytes(32).toString("hex")
  })
  const verification_url = `${config.frontend_url}email/${user._id}/token/${createToken.verification_token}`;
  const sendEmailResponse = await emailSend(user.email, 'email verification', verification_url)
  if (!sendEmailResponse) {
    throw new ApiError(httpStatus.FORBIDDEN, "something went wrong. contact support!")
  }
  return result;
}

const login = async (data: ILogin): Promise<ILoginUserResponse> => {
  const isUserExist: IUser | null = await User.findOne({ email: data.email });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found!');
  }
  else {
    if (isUserExist.isAuthService) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'user not found!');
    } else {
      if (isUserExist.password &&
        !(await User.isPasswordMatched(data.password, isUserExist.password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect!');
      }
      if (!isUserExist.isVerified) {
        const getToken = await Token.findOne({ userId: isUserExist._id, isVerified: false });
        if (getToken) {
          const verification_url = `${config.frontend_url}email/${isUserExist._id}/token/${getToken.verification_token}`;
          await emailSend(isUserExist.email, 'email verification', verification_url)
          throw new ApiError(409, "a verification email has been sent to your email!")
        } else {
          throw new ApiError(httpStatus.UNAUTHORIZED, "something went wrong. contact support!")
        }
      }
      if (isUserExist.status === USER_STATUS.ACTIVE) {
        const { userId, email, role } = isUserExist;
        const accessToken = jwtHelpers.createToken(
          { userId, email, role },
          config.jwt.secret as Secret,
          config.jwt.expires_in as string
        )
        const refreshToken = jwtHelpers.createToken(
          { userId, email, role },
          config.jwt.refresh_secret as Secret,
          config.jwt.refresh_expires_in as string
        )
        return { accessToken, role: isUserExist.role, refreshToken, }
      } else {
        throw new ApiError(httpStatus.FORBIDDEN,
          `your account is ${isUserExist.status}! try again later!`)
      }
    }
  }
};

const authServiceLogin = async (data: ISignup): Promise<ILoginUserResponse> => {
  const isUserExist: IUser | null = await User.findOne({ email: data.email })
  let userObjectId: Types.ObjectId | null = null;
  if (!isUserExist) {
    if (data.role === USER_ROLE.SELLER) {
      const seller = await Seller.create({
        image: null,
        phone: null,
        firstName: data.firstName,
        lastName: data.lastName ? data.lastName : null
      });
      userObjectId = seller._id;
    }
    if (data.role === USER_ROLE.CUSTOMER) {
      const customer = await Customer.create({
        image: null,
        phone: null,
        firstName: data.firstName,
        lastName: data.lastName ? data.lastName : null,
      });
      userObjectId = customer._id;
    }
    if (data.role === USER_ROLE.ADMIN) {
      const admin = await Admin.create({
        image: null,
        phone: null,
        firstName: data.firstName,
        lastName: data.lastName ? data.lastName : null,
      });
      userObjectId = admin._id;
    }
    else {
      const manager = await Manager.create({
        image: null,
        phone: null,
        firstName: data.firstName,
        lastName: data.lastName ? data.lastName : null,
      });
      userObjectId = manager._id;
    }
    const { firstName, lastName, ...userData } = data;
    const newData = {
      ...userData,
      password: null,
      userId: userObjectId,
      status: data.role === USER_ROLE.CUSTOMER ? USER_STATUS.ACTIVE : USER_STATUS.PENDING
    };
    const user: IUser = await User.create(newData);
    if (user.status === USER_STATUS.ACTIVE) {
      const { userId, email, role } = user;
      const accessToken = jwtHelpers.createToken(
        { userId, email, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
      )
      const refreshToken = jwtHelpers.createToken(
        { userId, email, role },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
      );
      return { accessToken, role: user.role, refreshToken }
    } else {
      throw new ApiError(httpStatus.FORBIDDEN,
        `your account is ${user.status}! try again later!`);
    }
  }
  else {
    if (data.role === isUserExist.role) {
      if (isUserExist.status === USER_STATUS.ACTIVE) {
        if (isUserExist.role === USER_ROLE.MANAGER) {
          let getUser: IManager | null = await Manager.findOne({ _id: isUserExist.userId });
          if (data.lastName != getUser?.lastName || data.firstName !== getUser?.firstName) {
            await Manager.findOneAndUpdate({ _id: isUserExist.userId },
              { lastName: data.lastName ? data.lastName : null, firstName: data.firstName })
          }
        }
        if (isUserExist.role === USER_ROLE.ADMIN) {
          let getUser: IAdmin | null = await Admin.findOne({ _id: isUserExist.userId });
          if (data.lastName != getUser?.lastName || data.firstName !== getUser?.firstName) {
            await Admin.findOneAndUpdate({ _id: isUserExist.userId },
              { lastName: data.lastName ? data.lastName : null, firstName: data.firstName })
          }
        }
        if (isUserExist.role === USER_ROLE.SELLER) {
          let getUser: ISeller | null = await Seller.findOne({ _id: isUserExist.userId });
          if (data.lastName != getUser?.lastName || data.firstName !== getUser?.firstName) {
            await Seller.findOneAndUpdate({ _id: isUserExist.userId },
              { lastName: data.lastName ? data.lastName : null, firstName: data.firstName })
          }
        }
        if (isUserExist.role === USER_ROLE.CUSTOMER) {
          let getUser: ICustomer | null = await Customer.findOne({ _id: isUserExist.userId });
          if (data.lastName != getUser?.lastName || data.firstName !== getUser?.firstName) {
            await Customer.findOneAndUpdate({ _id: isUserExist.userId },
              { lastName: data.lastName ? data.lastName : null, firstName: data.firstName })
          }
        }
        const { userId, email, role } = isUserExist;
        const accessToken = jwtHelpers.createToken(
          { userId, email, role },
          config.jwt.secret as Secret,
          config.jwt.expires_in as string
        );
        const refreshToken = jwtHelpers.createToken(
          { userId, email, role },
          config.jwt.refresh_secret as Secret,
          config.jwt.refresh_expires_in as string
        );
        return { accessToken, role: isUserExist.role, refreshToken }

      } else {
        throw new ApiError(httpStatus.UNAUTHORIZED,
          `your account is ${isUserExist.status}! try again later!`);
      }
    } else {
      throw new ApiError(httpStatus.UNAUTHORIZED,
        `you are not authorized to login as ${data.role}!`)
    }
  }
}

const verifyEmail = async (userId: string, token: string) => {
  const verification = await Token.findOne({ userId: userId, verification_token: token });
  if (!verification) {
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid access!')
  }
  if (verification.isVerified === true) {
    throw new ApiError(409, "email already verified!")
  } else {
    await Token.findOneAndUpdate({ userId: userId, verification_token: token }, { isVerified: true });
    const result = await User.findOneAndUpdate(
      { _id: userId }, { isVerified: true }, { new: true }
    )
    return result
  }
}

export const AuthService = {
  signup, login, authServiceLogin, verifyEmail
}
