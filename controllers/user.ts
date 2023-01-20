import { NextFunction, Request, Response } from "express";
import { createUser, loginUser } from "../services/user";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createUser(req.body);
    res.status(200).json({ message: "User successfully signed up" });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, token } = await loginUser(req.body.email, req.body.password);
    const { password, __v, ...userData } = (user as any)._doc;
    userData.token = token;
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};
