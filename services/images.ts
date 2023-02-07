import mongoose from "mongoose";
import Property from "../models/propertySchema";
import { CustomError } from "../utils/customError";
import { updateImageFiles } from "../utils/imageUploadHelper";

export const updatePropertyImages = async (
  files:
    | Express.Multer.File[]
    | undefined
    | { [fieldname: string]: Express.Multer.File[] },
  propertyId: mongoose.Types.ObjectId,
  images: string[] | undefined
) => {
  const property = await Property.findById(propertyId);
  if (!property) {
    throw new CustomError("NotFoundError", "Property not found");
  }

  if (!files) {
    await updateImageFiles(propertyId, images as string[]);
    property.images = images as string[];
  } else {
    let paths = (files as Express.Multer.File[]).map((file) => file.path);
    if (images) {
      paths = [...paths, ...images];
      await updateImageFiles(propertyId, paths);
    }
    property.images = paths;
  }

  await property.save();
  return property;
};
