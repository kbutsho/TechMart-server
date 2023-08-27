import { emailSend } from './../../../helpers/sendEmail';
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import config from "../../../config";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { ILogin, ILoginUserResponse, ISignup } from "./auth.interface";
import { USER_ROLE, USER_STATUS } from "../../../helpers/enums";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import { Token } from '../token/token.model';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { ResetPassword } from '../reset-password/resetPassword.model';


const signup = async (data: ISignup): Promise<IUser | null> => {
  const isUserExist: IUser | null = await User.findOne({ email: data.email });
  if (isUserExist) {
    throw new ApiError(httpStatus.CONFLICT, "email already exist!")
  }
  const newData = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    role: data.role,
    phone: data.phone,
    image: null,
    address: null,
    password: data.password,
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
    throw new ApiError(httpStatus.FORBIDDEN, "email not sent. contact support!")
  }
  return result;
}

const login = async (data: ILogin): Promise<ILoginUserResponse> => {
  const isUserExist = await User.findOne({ email: data.email });
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
          const email = await emailSend(isUserExist.email, 'email verification', verification_url)
          if (!email) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "email not sent. contact support!")
          }
          throw new ApiError(409, "verification message has been sent to your email!")
        } else {
          throw new ApiError(httpStatus.UNAUTHORIZED, "verification token failed. contact support!")
        }
      }
      if (isUserExist.status === USER_STATUS.ACTIVE) {
        const { _id, email, role } = isUserExist;
        const accessToken = jwtHelpers.createToken(
          { _id, email, role },
          config.jwt.secret as Secret,
          config.jwt.expires_in as string
        )
        const refreshToken = jwtHelpers.createToken(
          { _id, email, role },
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
  const isUserExist = await User.findOne({ email: data.email })
  if (!isUserExist) {
    const newData = {
      firstName: data.firstName,
      lastName: data.lastName ? data.lastName : null,
      email: data.email,
      role: USER_ROLE.CUSTOMER,
      phone: data.phone ? data.phone : null,
      image: null,
      address: null,
      password: null,
      isAuthService: true,
      isVerified: true,
      status:  USER_STATUS.ACTIVE 
    };
    const user = await User.create(newData);
    const { _id, email, role } = user;
    const accessToken = jwtHelpers.createToken(
      { _id, email, role },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    )
    const refreshToken = jwtHelpers.createToken(
      { _id, email, role },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    );
    return { accessToken, role: user.role, refreshToken }
  }
  else {
    if (isUserExist.status === USER_STATUS.ACTIVE) {
      if (data.lastName != isUserExist?.lastName || data.firstName !== isUserExist?.firstName) {
        await User.findOneAndUpdate({ _id: isUserExist._id },
          {
            lastName: data.lastName ? data.lastName : isUserExist.lastName,
            firstName: data.firstName,
          })
      }
      if (!isUserExist.isVerified) {
        await User.findOneAndUpdate({ _id: isUserExist._id }, { isVerified: true })
      }
      const { _id, email, role } = isUserExist;
      const accessToken = jwtHelpers.createToken(
        { _id, email, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
      );
      const refreshToken = jwtHelpers.createToken(
        { _id, email, role },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
      );
      return { accessToken, role: isUserExist.role, refreshToken }

    } else {
      throw new ApiError(httpStatus.UNAUTHORIZED,
        `your account is ${isUserExist.status}! try again later!`);
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

const sendEmail = async (email: string) => {
  const isUserExist = await User.findOne({ email: email });
  if (isUserExist) {
    const createToken = await ResetPassword.create({
      userId: isUserExist._id,
      isVerified: false,
      verification_token: crypto.randomBytes(32).toString("hex")
    })
    const verification_url = `${config.frontend_url}reset-password/${isUserExist._id}/token/${createToken.verification_token}`;
    const sendEmailResponse = await emailSend(isUserExist.email, 'reset password', verification_url)
    if (!sendEmailResponse) {
      throw new ApiError(httpStatus.FORBIDDEN, "something went wrong. contact support!")
    }
  }
  else {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found!')
  }
}

const resetPassword = async (userId: string, token: string, password: string) => {
  const isExist = await ResetPassword.findOne({ userId: userId, verification_token: token });
  if (isExist) {
    if (!isExist.isVerified) {
      const isUserExist = await User.findOne({ _id: userId });
      if (!isUserExist) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'user not found!')
      } else {
        if (isUserExist.isAuthService) {
          const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
          await User.findOneAndUpdate({ _id: userId },
            {
              isAuthService: false,
              password: hashedPassword
            }, { new: true })
          await ResetPassword.findOneAndUpdate({ userId: userId, verification_token: token, isVerified: false }, { isVerified: true })
        } else {
          const isSamePassword = await bcrypt.compare(password, isUserExist.password!);
          if (isSamePassword) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'cannot use previous password!')
          } else {
            const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
            await User.findOneAndUpdate({ _id: userId },
              {
                password: hashedPassword
              }, { new: true })
            await ResetPassword.findOneAndUpdate({ userId: userId, verification_token: token, isVerified: false }, { isVerified: true })
          }
        }
      }
    } else {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'link expired!')
    }
  }
  else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'invalid request!')
  }
}

export const AuthService = {
  signup, login, authServiceLogin, verifyEmail, sendEmail, resetPassword
}
