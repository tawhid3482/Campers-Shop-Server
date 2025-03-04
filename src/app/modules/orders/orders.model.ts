import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      required: true,
    },
    paymentMethod: { type: String, enum: ["Cash", "Card"], required: true },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre('save', async function(next){
    const order = this;
    const totalAmount = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    order.totalAmount = totalAmount;
    next();
})

export const Order = model<TOrder>("order", orderSchema);
