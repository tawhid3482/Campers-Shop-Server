import { Schema } from "mongoose";
import { TPayment } from "./payment.interface";

const paymentSchema = new Schema<TPayment>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  paymentMethod: {
    type: String,
    enum: { values: ["Cash", "Card"], message: "{VALUE} is not correct" },
    required: true,
  },
  transactionId: { type: String, required: true },
  status: {
    type: String,
    enum: {
      values: ["Pending", "Success", "Failed"],
      message: "{VALUE} is not correct",
    },
    default: "Pending",
  },
  amount: { type: Number, required: true },
});
