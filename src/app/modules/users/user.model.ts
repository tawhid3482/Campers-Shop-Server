import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: {
      type: String,
      enum: {
        values: ["customer", "admin", "superAdmin"],
        message: "{VALUE} is not correct",
      },
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

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
userSchema.post("save", function (doc, next) {
  (doc.password = ""), next();
});

export const User = model<TUser>("user", userSchema);
