import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { CustomRequest } from "../interfaces";
import { addRating, patchRating } from "../services/ratings";

export const addNewRating = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const propertyId = new mongoose.Types.ObjectId(req.params.propertyId);
    const rating = await addRating(
      (req as CustomRequest).user._id,
      propertyId,
      req.body.rating
    );
    res.status(201).json(rating);
  } catch (error) {
    next(error);
  }
};

export const updateRating = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ratingId = new mongoose.Types.ObjectId(req.params.ratingId);
    const userId = (req as CustomRequest).user._id;
    await patchRating(ratingId, userId, req.body.rating);
    res.status(200).json({ message: "Rating updated successfully" });
  } catch (error) {
    next(error);
  }
};
