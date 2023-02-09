import mongoose from "mongoose";
import Property from "../models/propertySchema";
import User from "../models/userSchema";
import { checkUser } from "../utils/checkUser";
import { CustomError } from "../utils/customError";
import { updateImageFiles } from "../utils/imageUploadHelper";

export const updatePropertyImages = async (
  files:
    | Express.Multer.File[]
    | undefined
    | { [fieldname: string]: Express.Multer.File[] },
  propertyId: mongoose.Types.ObjectId,
  images: string[] | undefined,
  userId: mongoose.Types.ObjectId
) => {
  const property = await Property.findById(propertyId);
  if (!property) {
    throw new CustomError("NotFoundError", "Property not found");
  }

  checkUser(property, userId, "Property");

  if (!files) {
    await updateImageFiles(images as string[], "properties", propertyId);
    property.images = images as string[];
  } else {
    let paths = (files as Express.Multer.File[]).map((file) => file.path);

    if (images) {
      paths = [...paths, ...images];
      await updateImageFiles(paths, "properties", propertyId);
    }
    property.images = paths;
  }

  await property.save();
  return property;
};

export const updateProfileImage = async (
  file: Express.Multer.File | undefined,
  userId: mongoose.Types.ObjectId
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError("NotFoundError", "User not found");
  }

  if (file) {
    updateImageFiles([file.path], "users", undefined, userId);
    user.image = file.path;
    await user.save();
  }

  return user;
};
