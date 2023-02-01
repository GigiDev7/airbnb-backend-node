import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: [isEmail, "Please provide a valid email address"],
    requried: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: [6, "Password must be at least 6 characters"],
    required: true,
  },
  image: String,
  favourites: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Property",
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
