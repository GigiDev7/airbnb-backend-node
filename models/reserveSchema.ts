import mongoose from "mongoose";

export const reserveSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
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