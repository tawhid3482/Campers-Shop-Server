import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: {
      type: String,
      enum: { values: ["customer", "admin"], message: "{VALUE} is not correct" },
      required: false,
    },
    address: {
      street: { type: String, required: false },
      city: { type: String, required: false },
      zip: { type: String, required: false },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export const User = model<TUser>("user", userSchema);
