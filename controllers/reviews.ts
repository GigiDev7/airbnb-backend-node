import { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";
import { CustomRequest } from "../interfaces";
import { createReview } from "../services/reviews";

export const addReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const propertyId = new mongoose.Types.ObjectId(req.params.propertyId);
    const property = await createReview(
      propertyId,
      (req as CustomRequest).user._id,
      req.body.review
    );
    res.status(201).json(property);
  } catch (error) {
    next(error);
  }
};
