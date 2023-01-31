"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchReview = exports.removeReview = exports.createReview = void 0;
const reviewSchema_1 = __importDefault(require("../models/reviewSchema"));
const createReview = (propertyId, userId, review) => {
    return reviewSchema_1.default.create({ author: userId, review, propertyId });
};
exports.createReview = createReview;
const removeReview = (reviewId) => {
    return reviewSchema_1.default.findByIdAndDelete(reviewId);
};
exports.removeReview = removeReview;
const patchReview = (reviewId, review) => {
    return reviewSchema_1.default.findByIdAndUpdate(reviewId, { review }, { new: true });
};
exports.patchReview = patchReview;
