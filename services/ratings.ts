import mongoose from "mongoose";
import Property from "../models/propertySchema";
import Rating from "../models/ratingSchema";
import { checkUser } from "../utils/checkUser";

export const addRating = async (
  userId: mongoose.Types.ObjectId,
  propertyId: mongoose.Types.ObjectId,
  rating: number
) => {
  const newRating = await Rating.create({ user: userId, propertyId, rating });
  const property = await Property.findById(propertyId);

  property?.ratings.push(newRating._id);
  await property?.save();

  return newRating;
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
