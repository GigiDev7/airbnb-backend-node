"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const reserveSchema_1 = require("./reserveSchema");
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        validate: [isEmail_1.default, "Please provide a valid email address"],
        requried: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: [6, "Password must be at least 6 characters"],
    },
    image: String,
    favourites: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "Property",
        default: [],
    },
    reserved: {
        type: [reserveSchema_1.reserveSchema],
        ref: "Property",
        default: [],
    },
});
