import mongoose from "mongoose";
import Property from "../models/propertySchema";
import { CustomError } from "../utils/customError";

export const createReview = async (
  propertyId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  review: string
) => {
  const property = await Property.findById(propertyId);
  if (!property) {
    throw new CustomError("NotFound Error", "Property not found");
  }
  property.reviews.push({ author: userId, review });
  await property.save();
  return property;
};
