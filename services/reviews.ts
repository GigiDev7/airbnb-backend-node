import mongoose from "mongoose";
import Property from "../models/propertySchema";
import Review from "../models/reviewSchema";
import { checkUser } from "../utils/checkUser";

export const createReview = async (
  propertyId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  review: string
) => {
  const newReview = await Review.create({ user: userId, review, propertyId });
  const property = await Property.findById(propertyId);

  property?.reviews.push(newReview._id);
  await property?.save();

  return newReview;
};

export const removeReview = async (
  reviewId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId
) => {
  const review = await Review.findById(reviewId);

  checkUser(review, userId, "Review");

  await review!.deleteOne();

  const property = await Property.findById(review?.propertyId);
  if (property) {
    property.reviews = property?.reviews.filter(
      (id) => !id.equals(review!._id)
    );
  }

  await property?.save();
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
