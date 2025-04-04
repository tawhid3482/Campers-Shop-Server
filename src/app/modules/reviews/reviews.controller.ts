import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { reviewsService } from "./reviews.service";
import sendResponse from "../../utils/sendResponse";

const createReviews = catchAsync(async (req, res) => {
  const result = await reviewsService.addReviewIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews created successfully",
    data: result,
  });
});
const getAllReviews = catchAsync(async (req, res) => {
  const result = await reviewsService.getAllReviewsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Reviews retrieved successfully",
    data: result,
  });
});
const getSingleReviews = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await reviewsService.getSingleReviewsFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Reviews retrieved successfully",
    data: result,
  });
});
const deleteReviews = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await reviewsService.deleteReviewsIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Reviews deleted successfully",
    data: result,
  });
});
const updateReviews = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await reviewsService.updateReviewsIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Reviews updated successfully",
    data: result,
  });
});

export const ReviewsControllers = {
  createReviews,
  getAllReviews,
  getSingleReviews,
  deleteReviews,
  updateReviews,
};
