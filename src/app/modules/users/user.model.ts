import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import { UserStatus } from "./user.constant";
const userSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    passwordChangedAt: {
      type: Date,
    },
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
    status: {
      type: String,
      enum: UserStatus,
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
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

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>("user", userSchema);
