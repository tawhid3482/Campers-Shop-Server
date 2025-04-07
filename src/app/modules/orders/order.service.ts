import AppError from "../../error/AppError";

import httpStatus from "http-status";
import { TOrder } from "./order.interface";
import { Order } from "./orders.model";

const createOrderIntoDB = async (payload: TOrder) => {
  const result = await Order.create(payload);
  return result;
};
const getAllOrderFromDB = async () => {
  const result = await Order.find().where("isDeleted").ne(true);;
  return result;
};

const getSingleOrderFromDB = async (id: string) => {
  // const isUserExists = await Order.findById(id)

  const result = await Order.findById(id).where("isDeleted").ne(true);;
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");
  }
  return result;
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
