import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { CustomRequest } from "../interfaces";
import {
  addBooking,
  getBookingsByUserOrProperty,
  findBookingAndUpdate,
  deleteBooking,
} from "../services/bookings";

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
    const bookings = await getBookingsByUserOrProperty(
      userId,
      "User",
      req.query
    );
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

export const getBookingsForProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const propertyId = new mongoose.Types.ObjectId(req.params.propertyId);
    const bookings = await getBookingsByUserOrProperty(
      propertyId,
      "Property",
      req.query
    );
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

export const updateBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookingId = new mongoose.Types.ObjectId(req.params.bookingId);
    const userId = (req as CustomRequest).user._id;
    await findBookingAndUpdate(bookingId, userId, req.body);
    res.status(200).json({ message: "Bookings updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const removeBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookingId = new mongoose.Types.ObjectId(req.params.bookingId);
    const userId = (req as CustomRequest).user._id;
    await deleteBooking(bookingId, userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
