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
  const filters: any = [];
  const datesFilter: any = {};

  if (query.city) {
    filters.push({ "location.city": query.city });
  }
  if (query.ownerId) {
    filters.push({ createdBy: new mongoose.Types.ObjectId(query.ownerId) });
  }
  if (query.guests) {
    filters.push({ maxGuests: { $gte: +query.guests } });
  }
  if (query.beds) {
    filters.push({ bedsQuantity: { $gte: +query.beds } });
  }
  if (query.minPrice) {
    filters.push({ price: { $gte: +query.minPrice } });
  }
  if (query.maxPrice) {
    filters[filters.length - 1].price = {
      ...filters[filters.length - 1].price,
      $lte: +query.maxPrice,
    };
  }
  if (query.propertyType) {
    const propertyTypes = query.propertyType.split(",");
    filters.push({ propertyType: { $in: propertyTypes } });
  }
  if (query.typeOfPlace) {
    const types = query.typeOfPlace.split(",");
    filters.push({ typeOfPlace: { $in: types } });
  }

  if (query.checkIn && query.checkOut) {
    datesFilter.checkIn = new Date(query.checkIn);
    datesFilter.checkOut = new Date(query.checkOut);
  }

  if (!filters.length || !datesFilter.checkIn) {
    return Property.find({}, "-__v").populate("createdBy", "-password -__v");
  }

  const page = +query.page || 1;
  const limit = +query.limit || 30;
  const skip = (page - 1) * limit;

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
      $unwind: { path: "$createdBy" },
    },
    {
      $lookup: {
        from: "reviews",
        foreignField: "_id",
        localField: "reviews",
        as: "reviews",
        pipeline: [
          {
            $lookup: {
              from: "users",
              foreignField: "_id",
              localField: "user",
              as: "user",
            },
          },
          {
            $unwind: { path: "$user" },
          },
          {
            $unset: ["user.password", "user.__v", "user.favourites"],
          },
        ],
      },
    },
    {
      $lookup: {
        from: "ratings",
        foreignField: "_id",
        localField: "ratings",
        as: "ratings",
        pipeline: [
          {
            $lookup: {
              from: "users",
              foreignField: "_id",
              localField: "user",
              as: "user",
            },
          },
          {
            $unwind: { path: "$user" },
          },
          {
            $unset: ["user.password", "user.__v", "user.favourites"],
          },
        ],
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
            $match: {
              $and: [
                { checkOut: { $gte: new Date() } },
                {
                  $or: [
                    {
                      $and: [
                        { checkOut: { $gte: datesFilter.checkIn } },
                        { checkIn: { $lte: datesFilter.checkIn } },
                      ],
                    },
                    {
                      $and: [
                        { checkOut: { $gte: datesFilter.checkOut } },
                        { checkIn: { $lte: datesFilter.checkOut } },
                      ],
                    },
                    {
                      $and: [
                        { checkOut: { $lte: datesFilter.checkOut } },
                        { checkIn: { $gte: datesFilter.checkIn } },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    },
    {
      $addFields: {
        totalBookings: { $size: "$bookings" },
      },
    },
    {
      $addFields: {
        avgRating: { $avg: "$ratings.rating" },
      },
    },
    {
      $match: { totalBookings: 0 },
    },
    {
      $limit: limit,
    },
    {
      $skip: skip,
    },
    {
      $unset: [
        "__v",
        "totalBookings",
        "bookings",
        "createdBy.password",
        "createdBy.favourites",
        "createdBy.__v",
        "ratings.propertyId",
        "reviews.propertyId",
        "ratings.__v",
        "reviews.__v",
      ],
    },
  ]);
};

export const findSingleProperty = async (
  propertyId: mongoose.Types.ObjectId
) => {
  const property = await Property.aggregate([
    {
      $match: { _id: propertyId },
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
      $unwind: { path: "$createdBy" },
    },
    {
      $lookup: {
        from: "reviews",
        foreignField: "_id",
        localField: "reviews",
        as: "reviews",
        pipeline: [
          {
            $lookup: {
              from: "users",
              foreignField: "_id",
              localField: "user",
              as: "user",
            },
          },
          {
            $unwind: { path: "$user" },
          },
          {
            $unset: ["user.password", "user.__v", "user.favourites"],
          },
        ],
      },
    },
    {
      $lookup: {
        from: "ratings",
        foreignField: "_id",
        localField: "ratings",
        as: "ratings",
        pipeline: [
          {
            $lookup: {
              from: "users",
              foreignField: "_id",
              localField: "user",
              as: "user",
            },
          },
          {
            $unwind: { path: "$user" },
          },
          {
            $unset: ["user.password", "user.__v", "user.favourites"],
          },
        ],
      },
    },
    {
      $addFields: {
        avgRating: { $avg: "$ratings.rating" },
      },
    },
    {
      $unset: [
        "__v",
        "totalBookings",
        "bookings",
        "createdBy.password",
        "createdBy.favourites",
        "createdBy.__v",
        "ratings.propertyId",
        "reviews.propertyId",
        "ratings.__v",
        "reviews.__v",
      ],
    },
  ]);

  return property[0];
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
