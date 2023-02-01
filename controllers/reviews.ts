import { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";
import { CustomRequest } from "../interfaces";
import { createReview, patchReview, removeReview } from "../services/reviews";

export const addReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const propertyId = new mongoose.Types.ObjectId(req.params.propertyId);
    const review = await createReview(
      propertyId,
      (req as CustomRequest).user._id,
      req.body.review
    );
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviewId = new mongoose.Types.ObjectId(req.params.reviewId);
    const userId = (req as CustomRequest).user._id;
    await removeReview(reviewId, userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviewId = new mongoose.Types.ObjectId(req.params.reviewId);
    const userId = (req as CustomRequest).user._id;
    await patchReview(reviewId, userId, req.body.review);
    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    next(error);
  }
};
