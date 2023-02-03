"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPropertyAndUpdate = exports.removeProperty = exports.findSingleProperty = exports.findProperties = exports.createProperty = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const propertySchema_1 = __importDefault(require("../models/propertySchema"));
const ratingSchema_1 = __importDefault(require("../models/ratingSchema"));
const reviewSchema_1 = __importDefault(require("../models/reviewSchema"));
const customError_1 = require("../utils/customError");
const checkPropertyHelper = (property, userId) => {
    if (!property) {
        throw new customError_1.CustomError("NotFoundError", "Property not found");
    }
    if (!property.createdBy.equals(userId)) {
        throw new customError_1.CustomError("Authorization Error", "You are not authorized to continue");
    }
};
const createProperty = (propertyData) => {
    return propertySchema_1.default.create(propertyData);
};
exports.createProperty = createProperty;
const findProperties = (query) => __awaiter(void 0, void 0, void 0, function* () {
    /* const filterObject: any = {}; */
    const filters = [];
    const datesFilter = {};
    if (query.city) {
        /* filterObject["location.city"] = query.city; */
        filters.push({ "location.city": query.city });
    }
    if (query.ownerId) {
        /*  filterObject.createdBy = query.ownerId; */
        filters.push({ createdBy: new mongoose_1.default.Types.ObjectId(query.ownerId) });
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
        filters[filters.length - 1].price = Object.assign(Object.assign({}, filters[filters.length - 1].price), { $lte: +query.maxPrice });
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
    if (!filters.length || !datesFilter.checkIn) {
        return propertySchema_1.default.find({}, "-__v").populate("createdBy", "-password -__v");
    }
    const page = +query.page || 1;
    const limit = +query.limit || 30;
    const skip = (page - 1) * limit;
    return propertySchema_1.default.aggregate([
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
});
exports.findProperties = findProperties;
const findSingleProperty = (propertyId) => __awaiter(void 0, void 0, void 0, function* () {
    const property = propertySchema_1.default.findById(propertyId)
        .populate("createdBy", "-password -__v")
        .exec();
    const ratings = ratingSchema_1.default.find({ propertyId })
        .populate("user", "-password -__v")
        .exec();
    const reviews = reviewSchema_1.default.find({ propertyId })
        .populate("user", "-password -__v")
        .exec();
    const result = yield Promise.all([property, ratings, reviews]);
    return result;
});
exports.findSingleProperty = findSingleProperty;
const removeProperty = (propertyId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const property = yield propertySchema_1.default.findById(propertyId);
    checkPropertyHelper(property, userId);
    yield property.deleteOne();
});
exports.removeProperty = removeProperty;
const findPropertyAndUpdate = (propertyId, userId, propertyData) => __awaiter(void 0, void 0, void 0, function* () {
    let property = yield propertySchema_1.default.findById(propertyId);
    checkPropertyHelper(property, userId);
    yield property.updateOne(propertyData, { new: true });
});
exports.findPropertyAndUpdate = findPropertyAndUpdate;
