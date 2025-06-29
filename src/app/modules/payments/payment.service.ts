import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { TPayment } from "./payment.interface";
import { Payment } from "./payment.model";
import { User } from "../users/user.model";
import { Order } from "../orders/orders.model";

import { v4 as uuidv4 } from "uuid";
import { sslcz } from "../../config/sslcommerz.config";
import config from "../../config";
import { Cart } from "../cart/cart.model";

const createPaymentIntoDB = async (payload: TPayment) => {
  const isUserExists = await User.findById(payload.user);
  const isOrderExists = await Order.findById(payload.orderId);

  if (!isUserExists) throw new AppError(httpStatus.NOT_FOUND, "User not found");
  if (!isOrderExists)
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");

  const transactionId = uuidv4();

  const initialPayload = {
    total_amount: payload.amount,
    currency: "BDT",
    tran_id: transactionId,
    success_url: "https://campers-shop-one.vercel.app/api/success-payment",
    fail_url: "https://campers-shop-client-ten.vercel.app",
    cancel_url: "https://campers-shop-client-ten.vercel.app",
    ipn_url: "https://campers-shop-one.vercel.app/api/ipn-success-payment",
    shipping_method: "Courier",
    product_name: "Product Name",
    product_category: "Camping",
    product_profile: "general",
    cus_name: isUserExists.name,
    cus_email: isUserExists.email,
    cus_add1: isUserExists.address?.street || "N/A",
    cus_add2: isUserExists.address?.city || "N/A",
    cus_postcode: isUserExists.address?.zip || "0000",
    cus_country: "Bangladesh",
    cus_phone: isUserExists.phone,
    cus_fax: "01711111111",
    ship_name: isOrderExists.shippingAddress?.name || "N/A",
    ship_add1: isOrderExists.shippingAddress?.address || "N/A",
    ship_city: isOrderExists.shippingAddress?.city || "N/A",
    ship_postcode: isOrderExists.shippingAddress?.zipCode || "0000",
    ship_country: "Bangladesh",
  };

  const response = await sslcz.init(initialPayload);

  if (response?.GatewayPageURL) {
    // console.log(response)
    // console.log("GatewayPageURL:", response.GatewayPageURL);

    // Save payment to DB
    await Payment.create({
      user: payload.user,
      orderId: payload.orderId,
      transactionId,
      paymentMethod: "Card",
      status: "Pending",
      amount: payload.amount,
    });

    const gatewayUrl = response.GatewayPageURL;
    return gatewayUrl;
  } else {
    console.error("SSLCommerz init failed:", response);
    throw new Error("GatewayPageURL not found in SSLCommerz response");
  }
};

const paymentSuccessHandler = async (payload: any, res: any): Promise<void> => {
  const { val_id, tran_id } = payload;

  // Validate payment from SSLCommerz
  const response = await fetch(
    `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${config.SSLCOMMERZ_STORE_ID}&store_passwd=${config.SSLCOMMERZ_STORE_PASSWORD}&format=json`
  );

  if (!response.ok) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to validate payment");
  }

  const result = await response.json();

  if (result.status !== "VALID") {
    throw new AppError(httpStatus.BAD_REQUEST, "Payment validation failed");
  }

  // Update payment status in database
  const payment = await Payment.findOne({ transactionId: tran_id });
  if (!payment) {
    throw new AppError(httpStatus.NOT_FOUND, "Payment not found");
  }

  payment.status = "Success";
  await payment.save();

  // 3. Delete user's cart after successful payment
  const userId = payment.user;
  const orderStatusUpdate = await Order.findOne({ user: userId });
  if (orderStatusUpdate) {
    orderStatusUpdate.orderStatus = "Success";
    await orderStatusUpdate.save();
  }

  await Cart.deleteMany({ user: userId });

  return res.redirect("https://campers-shop-client-ten.vercel.app");
};

const getAllPaymentFromDB = async () => {
  const result = await Payment.find().populate("user");
  return result;
};

const getSinglePaymentFromDB = async (id: string) => {
  const result = await Payment.findById(id).populate("user");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Payment not found");
  }
  return result;
};

const getSinglePaymentByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const payment = await Payment.find({ user: user._id }).populate({
    path: "user",
    select: "-password",
  });

  return payment;
};

const updatePaymentIntoDB = async (id: string, payload: TPayment) => {
  const isUserExists = await Payment.findById(id);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Payment not found");
  }
  const result = await Payment.findByIdAndUpdate(
    id,
    {
      ...payload,
    },
    { new: true, runValidators: true }
  );

  return result;
};

const deletePaymentIntoDB = async (id: string) => {
  const isUserExists = await Payment.findById(id);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Payment not found");
  }
  const result = await Payment.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true, runValidators: true }
  );

  return result;
};

export const PaymentService = {
  createPaymentIntoDB,
  getAllPaymentFromDB,
  getSinglePaymentFromDB,
  updatePaymentIntoDB,
  deletePaymentIntoDB,
  getSinglePaymentByEmail,
  paymentSuccessHandler,
};
