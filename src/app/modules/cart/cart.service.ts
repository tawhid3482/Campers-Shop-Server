import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { Cart } from "./cart.model";
import { TCart } from "./cart.interface";

const createCartIntoDB = async (payload: TCart) => {
  const result = await Cart.create(payload);
  return result;
};
const getAllCartFromDB = async () => {
  const result = await Cart.find();
  return result;
};

const getSingleCartFromDB = async (id: string) => {
  // const isUserExists = await Cart.findById(id)

  const result = await Cart.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Cart not found");
  }
  return result;
};
const updateCartIntoDB = async (id: string, payload: TCart) => {
  const isUserExists = await Cart.findById(id);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Cart not found");
  }
  const result = await Cart.findByIdAndUpdate(
    id,
    {
      ...payload,
    },
    { new: true, runValidators: true }
  );

  return result;
};
const deleteCartIntoDB = async (id: string) => {
  const isUserExists = await Cart.findById(id);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Cart not found");
  }
  const result = await Cart.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true, runValidators: true }
  );

  return result;
};

export const CartService = {
  createCartIntoDB,
  getAllCartFromDB,
  getSingleCartFromDB,
  updateCartIntoDB,
  deleteCartIntoDB,
};
