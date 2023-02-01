import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { CustomRequest } from "../interfaces";
import { addBooking, getBookingsByUser } from "../services/bookings";

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { propertyId, ...details } = req.body;
    propertyId = new mongoose.Types.ObjectId(propertyId);
    const userId = (req as CustomRequest).user._id;
    const booking = await addBooking(userId, propertyId, details);
    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

export const getPersonalBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as CustomRequest).user._id;
    const bookings = await getBookingsByUser(userId);
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};
