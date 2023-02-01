import mongoose from "mongoose";
import { IProperty } from "../interfaces";
import Property from "../models/propertySchema";
import Rating from "../models/ratingSchema";
import Review from "../models/reviewSchema";
import { CustomError } from "../utils/customError";

export const createProperty = (propertyData: IProperty) => {
  return Property.create(propertyData);
};

export const findProperties = () => {
  return Property.find({}, "-__v").populate("createdBy", "-password -__v");
};

export const findSingleProperty = async (
  propertyId: mongoose.Types.ObjectId
) => {
  const property = Property.findById(propertyId)
    .populate("createdBy", "-password -__v")
    .exec();
  const ratings = Rating.find({ propertyId })
    .populate("author", "-password -__v")
    .exec();
  const reviews = Review.find({ propertyId })
    .populate("author", "-password -__v")
    .exec();

  const result = await Promise.all([property, ratings, reviews]);
  return result;
};

export const removeProperty = async (
  propertyId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId
) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new CustomError("NotFoundError", "Property not found");
  }

  if (!property.createdBy?.equals(userId)) {
    throw new CustomError(
      "Authorization Error",
      "You are not authorized to continue"
    );
  }

  await property.delete();
};

export const findPropertyAndUpdate = async (
  propertyId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  propertyData: IProperty
) => {
  let property = await Property.findById(propertyId);

  if (!property) {
    throw new CustomError("NotFoundError", "Property not found");
  }

  if (!property.createdBy?._id.equals(userId)) {
    throw new CustomError(
      "Authorization Error",
      "You are not authorized to continue"
    );
  }

  await property.updateOne(propertyData, { new: true });
};
