import mongoose from "mongoose";
import Review from "../models/reviewSchema";

export const createReview = (
  propertyId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  review: string
) => {
  return Review.create({ author: userId, review, propertyId });
};

export const removeReview = (reviewId: mongoose.Types.ObjectId) => {
  return Review.findByIdAndDelete(reviewId);
};

export const patchReview = (
  reviewId: mongoose.Types.ObjectId,
  review: string
) => {
  return Review.findByIdAndUpdate(reviewId, { review }, { new: true });
};
