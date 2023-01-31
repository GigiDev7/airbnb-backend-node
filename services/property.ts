import mongoose from "mongoose";
import { IProperty } from "../interfaces";
import Property from "../models/propertySchema";
import Rating from "../models/ratingSchema";
import Review from "../models/reviewSchema";

export const createProperty = (propertyData: IProperty) => {
  return Property.create(propertyData);
};

export const findProperties = () => {
  return Property.find().populate("createdBy", "-password -__v");
};

export const findSingleProperty = async (
  propertyId: mongoose.Types.ObjectId
) => {
  const property = Property.findById(propertyId)
    .populate("createdBy", "-password -__v")
    .exec();
  const ratings = Rating.find({ propertyId }).populate("author").exec();
  const reviews = Review.find({ propertyId }).populate("author").exec();

  const result = await Promise.all([property, ratings, reviews]);
  return result;
};
