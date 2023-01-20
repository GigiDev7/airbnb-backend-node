import { IUser } from "../interfaces";
import User from "../models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { CustomError } from "../utils/customError";

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

const comparePasswords = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

const createAccessToken = (userId: mongoose.Types.ObjectId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};

export const createUser = async (userData: IUser) => {
  const hashedPassword = await hashPassword(userData.password);
  userData.password = hashedPassword;
  return User.create(userData);
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("Not Found Error", "User not found");
  }

  const isPasswordCorrect = await comparePasswords(password, user.password);
  if (!isPasswordCorrect) {
    throw new CustomError(
      "Authentication Error",
      "Incorrect email or password"
    );
  }

  const token = createAccessToken(user._id);
  return { user, token };
};
