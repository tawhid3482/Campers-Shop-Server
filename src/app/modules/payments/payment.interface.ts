import { Types } from "mongoose";

export type TPayment = {
  user: Types.ObjectId;
  orderId: Types.ObjectId;
  paymentMethod: "Cash" | "Card"; // Card = SSLCommerz
  transactionId?: string; 
  status: "Pending" | "Success" | "Failed";
  amount: number;
};


