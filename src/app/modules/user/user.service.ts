import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const profileInfo = async (userId: string): Promise<IUser | null> => {
  const result = await User.findById(userId)
    .select('-password -updatedAt -createdAt  -isVerified -isAuthService  -__v');
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found!')
  }
  return result;
};

export const UserService = { profileInfo }
