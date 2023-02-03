import mongoose from "mongoose";
import { IBooking } from "../interfaces";
import Booking from "../models/bookingSchema";
import Property from "../models/propertySchema";
import { checkUser } from "../utils/checkUser";

export const addBooking = async (
  userId: mongoose.Types.ObjectId,
  propertyId: mongoose.Types.ObjectId,
  bookingDetails: {
    checkIn: Date;
    checkOut: Date;
    guests: number;
    totalPrice: number;
  }
) => {
  const booking = await Booking.create({
    ...bookingDetails,
    user: userId,
    property: propertyId,
  });

  const property = await Property.findById(propertyId);
  property?.bookings.push(booking._id);
  await property?.save();

  return booking;
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

  const property = await Property.findById(booking?.property);
  if (property) {
    property.bookings = property.bookings.filter(
      (id) => !id.equals(booking!._id)
    );
  }

  await property!.save();
};
