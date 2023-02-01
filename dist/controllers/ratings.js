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
exports.updateRating = exports.addNewRating = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ratings_1 = require("../services/ratings");
const addNewRating = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const propertyId = new mongoose_1.default.Types.ObjectId(req.params.propertyId);
        const rating = yield (0, ratings_1.addRating)(req.user._id, propertyId, req.body.rating);
        res.status(201).json(rating);
    }
    catch (error) {
        next(error);
    }
});
exports.addNewRating = addNewRating;
const updateRating = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ratingId = new mongoose_1.default.Types.ObjectId(req.params.ratingId);
        const userId = req.user._id;
        yield (0, ratings_1.patchRating)(ratingId, userId, req.body.rating);
        res.status(200).json({ message: "Rating updated successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.updateRating = updateRating;
