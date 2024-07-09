/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface TUser {
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
  phone: string;
  address: string;
}

export interface UserModel extends Model<TUser> {
  // instance methods for checking if user exists
  isUserExistsByEmail(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
