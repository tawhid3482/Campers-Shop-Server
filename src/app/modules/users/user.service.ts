import AppError from "../../error/AppError";
import { sendImageToImageBB } from "../../utils/sendToImageImgBB";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";

const createUserIntoDB = async (payload: TUser) => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) {
    throw new Error("Customer Already exists");
  }
  const userData: Partial<TUser> = {
    ...payload,
    role: "customer",
  };

  const result = await User.create(userData);
  return result;
};
const createAdminIntoDB = async (payload: TUser) => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) {
    throw new Error("User Already exists");
  }
  const userData: Partial<TUser> = {
    ...payload,
    role: "admin",
  };

  const result = await User.create(userData);
  return result;
};

const getSingleUserFromDB = async (email: string) => {

  const result = await User.findOne({ email }).select("-password");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Cart not found");
  }
  return result;
};

export const userService = {
  createUserIntoDB,
  createAdminIntoDB,
  getSingleUserFromDB
};
