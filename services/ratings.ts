import mongoose from "mongoose";
import Rating from "../models/ratingSchema";
import { checkAuthor } from "../utils/checkAuthor";

export const addRating = (
  userId: mongoose.Types.ObjectId,
  propertyId: mongoose.Types.ObjectId,
  rating: number
) => {
  return Rating.create({ author: userId, propertyId, rating });
};

export const patchRating = async (
  ratingId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  rating: number
) => {
  const doc = await Rating.findById(ratingId);

  checkAuthor(doc, userId, "Rating");

  await doc!.updateOne({ rating });
};
