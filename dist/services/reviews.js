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
exports.patchReview = exports.removeReview = exports.createReview = void 0;
const propertySchema_1 = __importDefault(require("../models/propertySchema"));
const reviewSchema_1 = __importDefault(require("../models/reviewSchema"));
const checkUser_1 = require("../utils/checkUser");
const createReview = (propertyId, userId, review) => __awaiter(void 0, void 0, void 0, function* () {
    const newReview = yield reviewSchema_1.default.create({ user: userId, review, propertyId });
    const property = yield propertySchema_1.default.findById(propertyId);
    property === null || property === void 0 ? void 0 : property.reviews.push(newReview._id);
    yield (property === null || property === void 0 ? void 0 : property.save());
    return newReview;
});
exports.createReview = createReview;
const removeReview = (reviewId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield reviewSchema_1.default.findById(reviewId);
    (0, checkUser_1.checkUser)(review, userId, "Review");
    yield review.deleteOne();
    const property = yield propertySchema_1.default.findById(review === null || review === void 0 ? void 0 : review.propertyId);
    if (property) {
        property.reviews = property === null || property === void 0 ? void 0 : property.reviews.filter((id) => !id.equals(review._id));
    }
    yield (property === null || property === void 0 ? void 0 : property.save());
});
exports.removeReview = removeReview;
const patchReview = (reviewId, userId, review) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield reviewSchema_1.default.findById(reviewId);
    (0, checkUser_1.checkUser)(doc, userId, "Review");
    yield doc.updateOne({ review });
});
exports.patchReview = patchReview;
