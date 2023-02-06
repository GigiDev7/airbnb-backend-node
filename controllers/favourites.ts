import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { CustomRequest } from "../interfaces";
import {
  addToFavourites,
  getFavouritesByUser,
  removeFromFavourites,
} from "../services/favourites";

export const getFavourites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as CustomRequest).user._id;
    const favourites = await getFavouritesByUser(userId);
    res.status(200).json(favourites);
  } catch (error) {
    next(error);
  }
};

export const addFavourite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as CustomRequest).user._id;
    const propertyId = new mongoose.Types.ObjectId(req.body.propertyId);
    await addToFavourites(userId, propertyId);
    res.status(201).json({ message: "Successfully added to favorites" });
  } catch (error) {
    next(error);
  }
};

export const removeFavourite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as CustomRequest).user._id;
    const propertyId = new mongoose.Types.ObjectId(req.body.propertyId);
    await removeFromFavourites(userId, propertyId);
    res.status(200).json({ message: "Successfully removed from favorites" });
  } catch (error) {
    next(error);
  }
};
