import { Types } from "mongoose";

export type TOrder = {
  user: Types.ObjectId;
  items: {
    product: Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    phone: string;
    zipCode: string;
  };
};
