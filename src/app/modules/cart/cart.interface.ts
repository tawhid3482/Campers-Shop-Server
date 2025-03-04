import { Types } from "mongoose";

export type TCart = {
    user: Types.ObjectId;
    items: [
      {
        product: Types.ObjectId;
        quantity: number;
        price: number;
      }
    ];
    totalAmount: number;
}