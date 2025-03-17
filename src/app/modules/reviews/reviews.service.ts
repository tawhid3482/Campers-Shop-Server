
import httpStatus from "http-status";
import { TReview } from "./reviews.interface";
import { Reviews } from "./reviews.mdol";
import AppError from "../../error/AppError";

const addReviewIntoDB = async (payload: TReview) => {
  const result = await Reviews.create(payload);
  return result;
};
const getAllReviewsFromDB = async () => {
  const result = await Reviews.find();
  return result;
};

const getSingleReviewsFromDB = async (id: string) => {
  // const isUserExists = await Product.findById(id)

  const result = await Reviews.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  return result;
};
const updateReviewsIntoDB = async (id: string, payload: TReview) => {
  const isUserExists = await Reviews.findById(id);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  const result = await Reviews.findByIdAndUpdate(
    id,
    {
      ...payload,
    },
    { new: true, runValidators: true }
  );

  return result;
};
const deleteReviewsIntoDB = async (id: string) => {
  const isUserExists = await Reviews.findById(id);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  const result = await Reviews.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true, runValidators: true }
  );

  return result;
};

export const reviewsService = {
  addReviewIntoDB,
  getAllReviewsFromDB,
  getSingleReviewsFromDB,
  updateReviewsIntoDB,
  deleteReviewsIntoDB,
};
