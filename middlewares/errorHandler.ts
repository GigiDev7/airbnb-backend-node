import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "Not Found Error") {
    res.status(404).json({ message: err.message || "Something went wrong" });
  } else if (err.name === "Authentication Error") {
    res.status(404).json({ message: err.message || "Something went wrong" });
  } else if (err.name === "Validation Error") {
    res.status(403).json({ message: err.message || "Something went wrong" });
  } else if (err?.code === 11000) {
    res.status(422).json({ message: "User already exists" });
  } else {
    res.status(500).json(err);
  }
};
