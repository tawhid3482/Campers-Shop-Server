import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { TPayment } from "./payment.interface";
import { Payment } from "./payment.model";
import config from "../../config";
import { User } from "../users/user.model";
import { Order } from "../orders/orders.model";

import { v4 as uuidv4 } from "uuid";
import { sslcz } from "../../config/sslcommerz.config";

const createPaymentIntoDB = async (payload: TPayment) => {
  const isUserExists = await User.findById(payload.user);
  const isOrderExists = await Order.findById(payload.orderId);

  if (!isUserExists) throw new AppError(httpStatus.NOT_FOUND, "User not found");
  if (!isOrderExists) throw new AppError(httpStatus.NOT_FOUND, "Order not found");

  const transactionId = uuidv4();

  const initialPayload = {
    total_amount: payload.amount,
    currency: "BDT",
    tran_id: transactionId,
    success_url: "http://localhost:5000/success-payment",
    fail_url: "http://localhost:5173/fail",
    cancel_url: "http://localhost:5173/cancel",
    ipn_url: "http://localhost:5000/ipn-success-payment",
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

    const gatewayUrl = response.GatewayPageURL
    return gatewayUrl

  } else {
    console.error("SSLCommerz init failed:", response);
    throw new Error("GatewayPageURL not found in SSLCommerz response");
  }

};

const paymentSuccess = async (payload:any)=>{
  console.log(payload)

}

const getAllPaymentFromDB = async () => {
  const result = await Payment.find();
  return result;
};

const getSinglePaymentFromDB = async (id: string) => {
  const result = await Payment.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Payment not found");
  }
  return result;
};
const getSinglePaymentByEmail = async (email: string) => {
  const result = await Payment.findOne({ email });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Payment not found");
  }
  return result;
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
  paymentSuccess
};
