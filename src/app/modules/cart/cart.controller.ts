import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { CartService } from "./cart.service";

const createCart = catchAsync(async (req, res) => {
  const result = await CartService.createCartIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart created successfully",
    data: result,
  });
});
const getAllCart = catchAsync(async (req, res) => {
  const result = await CartService.getAllCartFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Cart retrieved successfully",
    data: result,
  });
});
const getSingleCart = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CartService.getSingleCartFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Cart retrieved successfully",
    data: result,
  });
});
const deleteCart = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CartService.deleteCartIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Cart deleted successfully",
    data: result,
  });
});
const updateCart = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CartService.updateCartIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Cart updated successfully",
    data: result,
  });
});


export const CartControllers ={
    createCart,
    getAllCart,
    getSingleCart,
    deleteCart,
    updateCart
}