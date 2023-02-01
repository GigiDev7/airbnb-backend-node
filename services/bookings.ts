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

export const getBookingsByUser = (
  userId: mongoose.Types.ObjectId,
  query: any
) => {
  const filterObject: any = {
    user: userId,
  };

  if (query.active) {
    filterObject.checkOut = { $gte: new Date() };
  }

  return Booking.find(filterObject);
};
