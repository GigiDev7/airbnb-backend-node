"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reserveSchema_1 = require("./reserveSchema");
const reviewSchema_1 = require("./reviewSchema");
const propertySchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 200,
    },
    description: String,
    location: {
        country: String,
        city: String,
        address: String,
    },
    maxGuests: Number,
    rooms: {
        total: Number,
        bedrooms: Number,
        bathrooms: Number,
    },
    bedsQuantity: Number,
    images: {
        type: [String],
        default: [],
    },
    ratings: {
        type: [reviewSchema_1.reviewSchema],
        default: [],
    },
    price: Number,
    amenities: {
        type: [String],
        default: [],
    },
    reservedDates: {
        type: [reserveSchema_1.reserveSchema],
        default: [],
    },
}, {
    timestamps: true,
});
const Property = mongoose_1.default.model("Property", propertySchema);
exports.default = Property;
