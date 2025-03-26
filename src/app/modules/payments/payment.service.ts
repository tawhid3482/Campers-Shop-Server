import AppError from "../../error/AppError";

import httpStatus from "http-status";
import { TPayment } from "./payment.interface";
import { Payment } from "./payment.model";

const createPaymentIntoDB = async (payload: TPayment) => {
  const result = await Payment.create(payload);
  return result;
};
const getAllPaymentFromDB = async () => {
  const result = await Payment.find();
  return result;
};

const getSinglePaymentFromDB = async (id: string) => {
  // const isUserExists = await Payment.findById(id)

  const result = await Payment.findById(id);
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
};
