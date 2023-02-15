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
exports.removeFromFavourites = exports.addToFavourites = exports.getFavouritesByUser = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const customError_1 = require("../utils/customError");
const getFavouritesByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const favourites = yield userSchema_1.default.aggregate([
        {
            $match: { _id: userId },
        },
        {
            $lookup: {
                from: "properties",
                localField: "favourites",
                foreignField: "_id",
                as: "favourites",
                pipeline: [
                    {
                        $lookup: {
                            from: "ratings",
                            localField: "ratings",
                            foreignField: "_id",
                            as: "ratings",
                        },
                    },
                    {
                        $addFields: {
                            avgRating: { $avg: "$ratings.rating" },
                        },
                    },
                ],
            },
        },
        {
            $project: { favourites: 1 },
        },
    ]);
    return favourites[0].favourites;
    /* if (user) {
      return user.favourites;
    } else {
      throw new CustomError("NotFoundError", " User not found");
    } */
});
exports.getFavouritesByUser = getFavouritesByUser;
const addToFavourites = (userId, propertyId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userSchema_1.default.findById(userId, { password: 0, __v: 0 });
    if (user) {
        user.favourites.push(propertyId);
        yield user.save();
        return user;
    }
    else {
        throw new customError_1.CustomError("NotFoundError", " User not found");
    }
});
exports.addToFavourites = addToFavourites;
const removeFromFavourites = (userId, propertyId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userSchema_1.default.findById(userId, "-password -__v");
    if (user) {
        user.favourites = user.favourites.filter((id) => !id.equals(propertyId));
        yield user.save();
        return user;
    }
    else {
        throw new customError_1.CustomError("NotFoundError", " User not found");
    }
});
exports.removeFromFavourites = removeFromFavourites;
