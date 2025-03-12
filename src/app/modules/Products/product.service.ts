import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);

  return result;
};
const getAllProductFromDB = async () => {
  const result = await Product.find();

  return result;
};
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);

  return result;
};
const updateProductIntoDB = async (id: string, payload: TProduct) => {
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
