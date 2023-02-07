import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { updatePropertyImages } from "../services/images";

export const uploadPropertyImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingImages = req.body.existingImages
      ? JSON.parse(req.body.existingImages)
      : null;
    const propertyId = new mongoose.Types.ObjectId(req.params.propertyId);
    const property = await updatePropertyImages(
      req.files,
      propertyId,
      existingImages
    );
    res.status(200).json({ message: "Images uploaded successfully" });
  } catch (error) {
    next(error);
  }
};
