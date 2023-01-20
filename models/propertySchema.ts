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
    propertyType: {
      type: String,
      enum: {
        values: ["House", "Apartment", "Guesthouse", "Hotel"],
        message: "{VALUE} is not supported",
      },
    },
    typeOfPlace: {
      type: String,
      enum: {
        values: ["Entire place", "Private room", "Shared room"],
        message: "{VALUE} is not supported",
      },
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
