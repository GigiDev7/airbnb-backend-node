import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";
import { reserveSchema } from "./reserveSchema";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: [isEmail, "Please provide a valid email address"],
    requried: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: [6, "Password must be at least 6 characters"],
  },
  image: String,
  favourites: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Property",
    default: [],
  },
  reserved: {
    type: [reserveSchema],
    ref: "Property",
    default: [],
  },
});
