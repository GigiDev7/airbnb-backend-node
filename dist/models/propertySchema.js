"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const propertySchema = new mongoose_1.default.Schema({
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
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
    price: Number,
    amenities: {
        type: [String],
        default: [],
    },
    propertyType: {
        type: String,
        enum: {
            values: ["House", "Apartment", "Guesthouse", "Hotel"],
            message: "{VALUE} is not supported",
        },
    },
    typeOfPlace: {
        type: String,
        enum: {
            values: ["Entire place", "Private room", "Shared room"],
            message: "{VALUE} is not supported",
        },
    },
    bookings: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "Booking",
    },
    reviews: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "Review",
    },
    ratings: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "Rating",
    },
}, {
    timestamps: true,
});
const Property = mongoose_1.default.model("Property", propertySchema);
exports.default = Property;
