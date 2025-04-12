import AppError from "../../error/AppError";

import httpStatus from "http-status";
import { TOrder } from "./order.interface";
import { Order } from "./orders.model";
import { User } from "../users/user.model";

const createOrderIntoDB = async (payload: TOrder) => {
  const result = await Order.create(payload);
  return result;
};
const getAllOrderFromDB = async () => {
  const result = await Order.find().populate('user')
  .populate("items.product")
  .where('isDeleted')
  .ne(true);
  return result;
};

const getSingleOrderFromDB = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const orders = await Order.find({ user: user._id }).populate({
    path: "user",
    select: "-password",
  }).populate("items.product");;

  return orders;
  
};

const updateOrderIntoDB = async (id: string, payload: TOrder) => {
  const isUserExists = await Order.findById(id).where("isDeleted").ne(true);;
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");
  }
  const result = await Order.findByIdAndUpdate(
    id,
    {
      ...payload,
    },
    { new: true, runValidators: true }
  );

  return result;
};
const deleteOrderIntoDB = async (id: string) => {
  const isUserExists = await Order.findById(id).where("isDeleted").ne(true);;
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");
  }
  const result = await Order.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true, runValidators: true }
  );

  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getAllOrderFromDB,
  getSingleOrderFromDB,
  updateOrderIntoDB,
  deleteOrderIntoDB,
};
