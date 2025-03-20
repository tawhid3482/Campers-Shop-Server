import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { CategoryService } from "./categories.service";

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.createCategoryIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});
const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.getAllCategoryFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Category retrieved successfully",
    data: result,
  });
});
const getSingleCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryService.getSingleCategoryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Category retrieved successfully",
    data: result,
  });
});
const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryService.deleteCategoryIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Category deleted successfully",
    data: result,
  });
});
const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryService.updateCategoryIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Category deleted successfully",
    data: result,
  });
});


export const CategoryControllers ={
    createCategory,
    getAllCategory,
    getSingleCategory,
    deleteCategory,
    updateCategory
}