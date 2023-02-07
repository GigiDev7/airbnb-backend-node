import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { CustomRequest } from "../interfaces";
import { updateProfileImage, updatePropertyImages } from "../services/images";

export const uploadPropertyImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingImages = req.body.existingImages
      ? JSON.parse(req.body.existingImages)
      : null;
    const userId = (req as CustomRequest).user._id;
    const propertyId = new mongoose.Types.ObjectId(req.params.propertyId);
    const property = await updatePropertyImages(
      req.files,
      propertyId,
      existingImages,
      userId
    );
    res.status(200).json({ message: "Images uploaded successfully" });
  } catch (error) {
    next(error);
  }
};

export const uploadProfileImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as CustomRequest).user._id;
    const user = await updateProfileImage(req.file, userId);
    res.status(200).json({ message: "Profile image uploaded successfully" });
  } catch (error) {
    next(error);
  }
};
