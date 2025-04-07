import { Types } from "mongoose";

export type TPayment = {
  user: Types.ObjectId;
  orderId: Types.ObjectId;
  paymentMethod: "Cash" | "Card"; // Card = SSLCommerz
  transactionId: string; // Can be generated manually or use SSLCommerz's tran_id
  val_id?: string; // Returned by SSLCommerz
  status: "Pending" | "Success" | "Failed";
  amount: number;
  currency?: string;
  storeAmount?: number;
  cardType?: string;
  bankTranId?: string;
  tranDate?: string;
};
