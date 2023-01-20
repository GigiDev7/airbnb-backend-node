"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.bookingSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    checkIn: Date,
    checkOut: Date,
    guests: Number,
    totalPrice: Number,
}, {
    _id: false,
    timestamps: true,
});
