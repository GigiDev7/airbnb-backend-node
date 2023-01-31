import mongoose from "mongoose";

export const ratingSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rating: Number,
  },
  {
    _id: false,
    timestamps: true,
  }
);
