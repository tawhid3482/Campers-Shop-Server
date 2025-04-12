import AppError from "../../error/AppError";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import httpStatus from "http-status";

const createProductIntoDB = async (payload: TProduct) => {
  const result = (await Product.create(payload)).populate('category')
  return result;
};
const getAllProductFromDB = async () => {
  const result = await Product.find({ isDeleted: { $ne: true } }).populate('category');
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const product = await Product.findById(id).populate('category');
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  return product;
};
const updateProductIntoDB = async (id: string, payload: TProduct) => {
  const isProductExists = await Product.findById(id);
  if (!isProductExists) {
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
  console.log(id)
  const isProductExists = await Product.findById(id);
  if (!isProductExists) {
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
