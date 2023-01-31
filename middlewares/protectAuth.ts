import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { CustomRequest } from "../interfaces";
import User from "../models/userSchema";

export const protectAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization || !req.headers.authorization.split(" ")[1]) {
    return res.status(403).json({ message: "Authorization failed" });
  }

  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(
    token,
    process.env.JWT_SECRET as Secret,
    async (err, decodedData) => {
      if (err) {
        return res.status(403).json({ message: "Authorization failed" });
      }
      const user = await User.findById((decodedData as any).id, "-password");
      if (user) {
        (req as CustomRequest).user = user;
      } else {
        return res.status(403).json({ message: "Invalid credentials" });
      }
      next();
    }
  );
};
