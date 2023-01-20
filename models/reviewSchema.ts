import mongoose from "mongoose";

export const reviewSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rating: Number,
    review: String,
  },
  {
    _id: false,
    timestamps: true,
  }
);
