import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";
import httpStatus from "http-status";

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer created Successfully",
    data: result,
  });
});
const createAdmin = catchAsync(async (req, res) => {
  const result = await userService.createAdminIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created Successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await userService.getSingleUserFromDB(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " User retrieved successfully",
    data: result,
  });
});
const getAllUser = catchAsync(async (req, res) => {
  const result = await userService.getAllUserFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " User retrieved successfully",
    data: result,
  });
});
const adminStats = catchAsync(async (req, res) => {
  const result = await userService.adminStats();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " User retrieved successfully",
    data: result,
  });
});



export const userController = {
  createUser,
  createAdmin,
  getSingleUser,
  getAllUser,
  adminStats
};
