"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchRating = exports.addRating = void 0;
const ratingSchema_1 = __importDefault(require("../models/ratingSchema"));
const addRating = (userId, propertyId, rating) => {
    return ratingSchema_1.default.create({ author: userId, propertyId, rating });
};
exports.addRating = addRating;
const patchRating = (ratingId, rating) => {
    return ratingSchema_1.default.findByIdAndUpdate(ratingId, { rating }, { new: true });
};
exports.patchRating = patchRating;
