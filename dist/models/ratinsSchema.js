"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.ratingSchema = new mongoose_1.default.Schema({
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    propertyId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Property",
    },
    rating: Number,
}, {
    timestamps: true,
});
