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
exports.updateReview = exports.deleteReview = exports.addReview = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const reviews_1 = require("../services/reviews");
const addReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const propertyId = new mongoose_1.default.Types.ObjectId(req.params.propertyId);
        const review = yield (0, reviews_1.createReview)(propertyId, req.user._id, req.body.review);
        res.status(201).json(review);
    }
    catch (error) {
        next(error);
    }
});
exports.addReview = addReview;
const deleteReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewId = new mongoose_1.default.Types.ObjectId(req.params.reviewId);
        yield (0, reviews_1.removeReview)(reviewId);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
exports.deleteReview = deleteReview;
const updateReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewId = new mongoose_1.default.Types.ObjectId(req.params.reviewId);
        const review = yield (0, reviews_1.patchReview)(reviewId, req.body.review);
        res.status(200).json(review);
    }
    catch (error) {
        next(error);
    }
});
exports.updateReview = updateReview;
