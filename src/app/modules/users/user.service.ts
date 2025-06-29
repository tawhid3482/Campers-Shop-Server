import AppError from "../../error/AppError";
import { sendImageToImageBB } from "../../utils/sendToImageImgBB";
import { Order } from "../orders/orders.model";
import { Payment } from "../payments/payment.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";

const createUserIntoDB = async (payload: TUser) => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) {
    throw new Error("Customer Already exists");
  }
  const userData: Partial<TUser> = {
    ...payload,
    role: "customer",
  };

  const result = await User.create(userData);
  return result;
};
const createAdminIntoDB = async (payload: TUser) => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) {
    throw new Error("User Already exists");
  }
  const userData: Partial<TUser> = {
    ...payload,
    role: "admin",
  };

  const result = await User.create(userData);
  return result;
};

const getSingleUserFromDB = async (email: string) => {
  const result = await User.findOne({ email }).select("-password");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return result;
};
const getAllUserFromDB = async () => {
  const result = await User.find().select("-password");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return result;
};

const adminStats = async () => {
  const users = await User.find().select("-password");
  const orders = await Order.find();
  const payments = await Payment.find();

  // Total Revenue
  const totalRevenue = payments.reduce(
    (sum, payment) => sum + (payment.amount || 0),
    0
  );

  // Confirmed Orders
  const totalConfirmedOrders = orders.filter(
    (order) => order.orderStatus === "Success"
  ).length;

  // Pending Orders
  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "Pending"
  ).length;

  // Shipping Orders
  const shippingOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  // Daily Revenue (Group by date)
  const dailyRevenue = await Payment.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // ✅ Monthly Revenue (Group by month-year)
  const monthlyRevenue = await Payment.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m", date: "$createdAt" },
        },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return {
    totalUsers: users.length,
    totalOrders: orders.length,
    totalRevenue,
    totalConfirmedOrders,
    pendingOrders,
    shippingOrders,
    dailyRevenue,
    monthlyRevenue, // ✅ Added Here
  };
};

export const userService = {
  createUserIntoDB,
  createAdminIntoDB,
  getSingleUserFromDB,
  getAllUserFromDB,
  adminStats,
};
