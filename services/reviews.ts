import mongoose from "mongoose";
import Review from "../models/reviewSchema";
import { checkUser } from "../utils/checkUser";

export const createReview = (
  propertyId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  review: string
) => {
  return Review.create({ user: userId, review, propertyId });
};

export const removeReview = async (
  reviewId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId
) => {
  const review = await Review.findById(reviewId);

  checkUser(review, userId, "Review");

  await review!.deleteOne();
};

export const patchReview = async (
  reviewId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  review: string
) => {
  const doc = await Review.findById(reviewId);

  checkUser(doc, userId, "Review");

  await doc!.updateOne({ review });
};
