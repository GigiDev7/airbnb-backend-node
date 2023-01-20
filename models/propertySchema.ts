import mongoose from "mongoose";
import { bookingSchema } from "./bookingSchema";
import { reviewSchema } from "./reviewSchema";

const propertySchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      maxLength: 200,
    },
    description: String,
    location: {
      country: String,
      city: String,
      address: String,
    },
    maxGuests: Number,
    rooms: {
      total: Number,
      bedrooms: Number,
      bathrooms: Number,
    },
    bedsQuantity: Number,
    images: {
      type: [String],
      default: [],
    },
    ratings: {
      type: [reviewSchema],
      default: [],
    },
    price: Number,
    amenities: {
      type: [String],
      default: [],
    },
    bookedDates: {
      type: [bookingSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;
