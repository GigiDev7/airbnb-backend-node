import mongoose from "mongoose";
import Rating from "../models/ratingSchema";

export const addRating = (
  userId: mongoose.Types.ObjectId,
  propertyId: mongoose.Types.ObjectId,
  rating: number
) => {
  return Rating.create({ author: userId, propertyId, rating });
};

export const patchRating = (
  ratingId: mongoose.Types.ObjectId,
  rating: number
) => {
  return Rating.findByIdAndUpdate(ratingId, { rating }, { new: true });
};
