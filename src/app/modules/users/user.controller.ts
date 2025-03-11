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

export const userController = {
  createUser,
  createAdmin,
};
