import mongoose from "mongoose";
import { IBooking } from "../interfaces";
import Booking from "../models/bookingSchema";
import { checkUser } from "../utils/checkUser";

export const addBooking = (
  userId: mongoose.Types.ObjectId,
  propertyId: mongoose.Types.ObjectId,
  bookingDetails: {
    checkIn: Date;
    checkOut: Date;
    guests: number;
    totalPrice: number;
  }
) => {
  return Booking.create({
    ...bookingDetails,
    user: userId,
    property: propertyId,
  });
};

export const getBookingsByUserOrProperty = (
  id: mongoose.Types.ObjectId,
  type: "User" | "Property",
  query: any
) => {
  const filterObject: any = {};

  if (type === "User") {
    filterObject.user = id;
  } else {
    filterObject.property = id;
  }

  if (query.active) {
    filterObject.checkOut = { $gte: new Date() };
  }

  return Booking.find(filterObject);
};

export const findBookingAndUpdate = async (
  bookingId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  bookingData: IBooking
) => {
  const booking = await Booking.findById(bookingId);

  checkUser(booking, userId, "Booking");

  await booking!.updateOne(bookingData);
};

export const deleteBooking = async (
  bookingId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId
) => {
  const booking = await Booking.findById(bookingId);

  checkUser(booking, userId, "Booking");

  await booking!.deleteOne();
};
