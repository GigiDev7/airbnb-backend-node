import mongoose from "mongoose";
import Booking from "../models/bookingSchema";

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
