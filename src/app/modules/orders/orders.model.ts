import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface"; 

const orderSchema = new Schema<TOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
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
    shippingAddress: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      phone: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to calculate the totalAmount before saving the order
orderSchema.pre('save', async function(next) {
  const order = this;

  // Calculate the total amount by multiplying price and quantity of each item
  const totalAmount = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  // Assign the calculated totalAmount to the order object
  order.totalAmount = totalAmount;

  next();
});

// Create the model
export const Order = model<TOrder>("Order", orderSchema);
