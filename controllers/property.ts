import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { CustomRequest } from "../interfaces";
import {
  createProperty,
  findProperties,
  findPropertyAndUpdate,
  findSingleProperty,
  removeProperty,
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
    const properties = await findProperties(req.query);
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
    const property = await findSingleProperty(propertyId);
    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const propertyId = new mongoose.Types.ObjectId(req.params.propertyId);
    const userId = (req as CustomRequest).user._id;
    await removeProperty(propertyId, userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const propertyId = new mongoose.Types.ObjectId(req.params.propertyId);
    const userId = (req as CustomRequest).user._id;
    await findPropertyAndUpdate(propertyId, userId, req.body);
    res.status(200).json({ message: " Updated successfully" });
  } catch (error) {
    next(error);
  }
};
