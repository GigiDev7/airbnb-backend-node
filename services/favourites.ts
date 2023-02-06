import mongoose from "mongoose";
import User from "../models/userSchema";
import { CustomError } from "../utils/customError";

export const getFavouritesByUser = async (userId: mongoose.Types.ObjectId) => {
  const user = await User.findById(userId).populate("favourites");

  if (user) {
    return user.favourites;
  } else {
    throw new CustomError("NotFoundError", " User not found");
  }
};

export const addToFavourites = async (
  userId: mongoose.Types.ObjectId,
  propertyId: mongoose.Types.ObjectId
) => {
  const user = await User.findById(userId);

  if (user) {
    user.favourites.push(propertyId);
    await user.save();
  } else {
    throw new CustomError("NotFoundError", " User not found");
  }
};

export const removeFromFavourites = async (
  userId: mongoose.Types.ObjectId,
  propertyId: mongoose.Types.ObjectId
) => {
  const user = await User.findById(userId);

  if (user) {
    user.favourites = user.favourites.filter((id) => !id.equals(propertyId));
    await user.save();
  } else {
    throw new CustomError("NotFoundError", " User not found");
  }
};