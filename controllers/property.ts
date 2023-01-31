import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { CustomRequest } from "../interfaces";
import {
  createProperty,
  findProperties,
  findSingleProperty,
} from "../services/property";

export const addProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const property = await createProperty({
      ...req.body,
      createdBy: (req as CustomRequest).user._id,
    });
    res.status(201).json(property);
  } catch (error) {
    next(error);
  }
};

export const getProperties = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const properties = await findProperties();
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

export const getSingleProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const propertyId = new mongoose.Types.ObjectId(req.params.propertyId);
    const result = await findSingleProperty(propertyId);
    res
      .status(200)
      .json({ property: result[0], ratings: result[1], reviews: result[2] });
  } catch (error) {
    next(error);
  }
};
