import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../interfaces";
import { createProperty, findProperties } from "../services/property";

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
