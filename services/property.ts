import mongoose from "mongoose";
import { IProperty } from "../interfaces";
import Booking from "../models/bookingSchema";
import Property from "../models/propertySchema";
import Rating from "../models/ratingSchema";
import Review from "../models/reviewSchema";
import { CustomError } from "../utils/customError";

const checkPropertyHelper = (
  property: any,
  userId: mongoose.Types.ObjectId
) => {
  if (!property) {
    throw new CustomError("NotFoundError", "Property not found");
  }

  if (!property.createdBy.equals(userId)) {
    throw new CustomError(
      "Authorization Error",
      "You are not authorized to continue"
    );
  }
};

export const createProperty = (propertyData: IProperty) => {
  return Property.create(propertyData);
};

export const findProperties = async (query: any) => {
  /* const filterObject: any = {}; */
  const filters: any = [];
  const datesFilter: any = {};

  if (query.city) {
    /* filterObject["location.city"] = query.city; */
    filters.push({ "location.city": query.city });
  }
  if (query.ownerId) {
    /*  filterObject.createdBy = query.ownerId; */
    filters.push({ createdBy: new mongoose.Types.ObjectId(query.ownerId) });
  }
  if (query.guests) {
    /* filterObject.maxGuests = { $gte: query.guests }; */
    filters.push({ maxGuests: { $gte: +query.guests } });
  }
  if (query.beds) {
    /* filterObject.bedsQuantity = { $gte: query.beds }; */
    filters.push({ bedsQuantity: { $gte: +query.beds } });
  }
  if (query.minPrice) {
    /* filterObject.price = { $gte: query.minPrice }; */
    filters.push({ price: { $gte: +query.minPrice } });
  }
  if (query.maxPrice) {
    /* filterObject.price = { ...filterObject.price, $lte: +query.maxPrice }; */
    filters[filters.length - 1].price = {
      ...filters[filters.length - 1].price,
      $lte: +query.maxPrice,
    };
  }
  if (query.propertyType) {
    const propertyTypes = query.propertyType.split(",");
    /* filterObject.propertyType = { $in: propertyTypes }; */
    filters.push({ propertyType: { $in: propertyTypes } });
  }
  if (query.typeOfPlace) {
    const types = query.typeOfPlace.split(",");
    /* filterObject.typeOfPlace = { $in: types }; */
    filters.push({ typeOfPlace: { $in: types } });
  }

  if (query.checkIn && query.checkOut) {
    datesFilter.checkIn = new Date(query.checkIn);
    datesFilter.checkOut = new Date(query.checkOut);
  }

  if (!filters.length) {
    return Property.find({}, "-__v").populate("createdBy", "-password -__v");
  }

  return Property.aggregate([
    {
      $match: {
        $and: [...filters],
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "createdBy",
        as: "createdBy",
      },
    },
    {
      $lookup: {
        from: "bookings",
        foreignField: "_id",
        localField: "bookings",
        as: "bookings",
        pipeline: [
          {
            $match: { checkOut: { $gte: new Date() } },
          },
        ],
      },
    },
    {
      $addFields: {
        bookings: {
          $filter: {
            input: "$bookings",
            as: "booking",
            cond: {
              $or: [
                {
                  $and: [
                    { $gte: ["$$booking.checkOut", datesFilter.checkIn] },
                    { $lte: ["$$booking.checkIn", datesFilter.checkIn] },
                  ],
                },
                {
                  $and: [
                    { $gte: ["$$booking.checkOut", datesFilter.checkOut] },
                    { $lte: ["$$booking.checkIn", datesFilter.checkOut] },
                  ],
                },
                {
                  $and: [
                    { $lte: ["$$booking.checkOut", datesFilter.checkOut] },
                    { $gte: ["$$booking.checkIn", datesFilter.checkIn] },
                  ],
                },
              ],
            },
          },
        },
      },
    },
    {
      $addFields: {
        totalBookings: { $size: "$bookings" },
      },
    },
    {
      $match: { totalBookings: 0 },
    },
    {
      $unset: [
        "__v",
        "totalBookings",
        "bookings",
        "createdBy.password",
        "createdBy.favourites",
        "createdBy.__v",
      ],
    },
  ]);
};

export const findSingleProperty = async (
  propertyId: mongoose.Types.ObjectId
) => {
  const property = Property.findById(propertyId)
    .populate("createdBy", "-password -__v")
    .exec();
  const ratings = Rating.find({ propertyId })
    .populate("user", "-password -__v")
    .exec();
  const reviews = Review.find({ propertyId })
    .populate("user", "-password -__v")
    .exec();

  const result = await Promise.all([property, ratings, reviews]);
  return result;
};

export const removeProperty = async (
  propertyId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId
) => {
  const property = await Property.findById(propertyId);

  checkPropertyHelper(property, userId);

  await property!.deleteOne();
};

export const findPropertyAndUpdate = async (
  propertyId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  propertyData: IProperty
) => {
  let property = await Property.findById(propertyId);

  checkPropertyHelper(property, userId);

  await property!.updateOne(propertyData, { new: true });
};
