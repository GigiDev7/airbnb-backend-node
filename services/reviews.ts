import mongoose from "mongoose";
import Review from "../models/reviewSchema";
import { checkAuthor } from "../utils/checkAuthor";

export const createReview = (
  propertyId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  review: string
) => {
  return Review.create({ author: userId, review, propertyId });
};

export const removeReview = async (
  reviewId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId
) => {
  const review = await Review.findById(reviewId);

  checkAuthor(review, userId, "Review");

  await review!.deleteOne();
};

export const patchReview = async (
  reviewId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  review: string
) => {
  const doc = await Review.findById(reviewId);

  checkAuthor(doc, userId, "Review");

  await doc!.updateOne({ review });
};
