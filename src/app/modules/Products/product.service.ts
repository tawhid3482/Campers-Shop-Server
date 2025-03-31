import AppError from "../../error/AppError";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import httpStatus from "http-status";

const createProductIntoDB = async (payload: TProduct) => {
  const result = (await Product.create(payload)).populate('category')
  return result;
};
const getAllProductFromDB = async () => {
  const result = await Product.find().populate('category');
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  // const isUserExists = await Product.findById(id)

  const result = await Product.findById(id).populate('category');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  return result;
};
const updateProductIntoDB = async (id: string, payload: TProduct) => {
  const isUserExists = await Product.findById(id);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  const result = await Product.findByIdAndUpdate(
    id,
    {
      ...payload,
    },
    { new: true, runValidators: true }
  );

  return result;
};
const deleteProductIntoDB = async (id: string) => {
  const isUserExists = await Product.findById(id);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  const result = await Product.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true, runValidators: true }
  );

  return result;
};

export const productService = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductIntoDB,
};
