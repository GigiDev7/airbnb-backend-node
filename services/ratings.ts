import mongoose from "mongoose";
import Rating from "../models/ratingSchema";
import { checkUser } from "../utils/checkUser";

export const addRating = (
  userId: mongoose.Types.ObjectId,
  propertyId: mongoose.Types.ObjectId,
  rating: number
) => {
  return Rating.create({ user: userId, propertyId, rating });
};

export const patchRating = async (
  ratingId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  rating: number
) => {
  const doc = await Rating.findById(ratingId);

  checkUser(doc, userId, "Rating");

  await doc!.updateOne({ rating });
};
