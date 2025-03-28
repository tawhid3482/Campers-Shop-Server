import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { OrderService } from "./order.service";

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderService.createOrderIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});
const getAllOrder = catchAsync(async (req, res) => {
  const result = await OrderService.getAllOrderFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Order retrieved successfully",
    data: result,
  });
});
const getSingleOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderService.getSingleOrderFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Order retrieved successfully",
    data: result,
  });
});
const deleteOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderService.deleteOrderIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Order deleted successfully",
    data: result,
  });
});
const updateOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderService.updateOrderIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Order updated successfully",
    data: result,
  });
});


export const OrderControllers ={
    createOrder,
    getAllOrder,
    getSingleOrder,
    deleteOrder,
    updateOrder
}