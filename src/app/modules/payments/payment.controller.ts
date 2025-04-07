import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { PaymentService } from "./payment.service";

const createPayment = catchAsync(async (req, res) => {
  const result = await PaymentService.createPaymentIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment successful",
    data: result,
  });
});

const getAllPayment = catchAsync(async (req, res) => {
  const result = await PaymentService.getAllPaymentFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Payment retrieved successfully",
    data: result,
  });
});

const getSinglePayment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PaymentService.getSinglePaymentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Payment retrieved successfully",
    data: result,
  });
});
const getSinglePaymentByEmail = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await PaymentService.getSinglePaymentFromDB(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Payment retrieved successfully",
    data: result,
  });
});

const deletePayment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PaymentService.deletePaymentIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Payment deleted successfully",
    data: result,
  });
});

const updatePayment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PaymentService.updatePaymentIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Payment updated successfully",
    data: result,
  });
});

export const PaymentControllers = {
  createPayment,
  getAllPayment,
  getSinglePayment,
  deletePayment,
  updatePayment,
};