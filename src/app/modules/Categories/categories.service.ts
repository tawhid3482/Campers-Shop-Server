import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { TCategory } from "./category.interface";
import { Category } from "./categories.model";

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};
const getAllCategoryFromDB = async () => {
  const result = await Category.find();
  return result;
};

const getSingleCategoryFromDB = async (id: string) => {
  // const isUserExists = await Category.findById(id)

  const result = await Category.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }
  return result;
};
const updateCategoryIntoDB = async (id: string, payload: TCategory) => {
  const isUserExists = await Category.findById(id);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }
  const result = await Category.findByIdAndUpdate(
    id,
    {
      ...payload,
    },
    { new: true, runValidators: true }
  );

  return result;
};
const deleteCategoryIntoDB = async (id: string) => {
  const isUserExists = await Category.findById(id);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }
  const result = await Category.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true, runValidators: true }
  );

  return result;
};

export const CategoryService = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
  getSingleCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryIntoDB,
};
