import mongoose from "mongoose";

export const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    checkIn: Date,
    checkOut: Date,
    guests: Number,
    totalPrice: Number,
  },
  {
    _id: false,
    timestamps: true,
  }
);
