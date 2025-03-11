import { Model } from "mongoose";
import { User_Role } from "./user.constant";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  passwordChangedAt?: Date;
  role: "customer" | "admin" | "superAdmin";
  address?: {
    street: string;
    city: string;
    zip: string;
  };
  isDeleted:boolean,
  status: 'in-progress' | 'blocked';
};

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
export type TUserRole = keyof typeof User_Role;
