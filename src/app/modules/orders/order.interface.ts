import { Types } from "mongoose";

export type TOrder = {
  user: Types.ObjectId;
  items: [
    {
      product: Types.ObjectId;
      quantity: number;
      price: number;
    }
  ];
  totalAmount: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  paymentMethod: "Cash" | "Card";
};
