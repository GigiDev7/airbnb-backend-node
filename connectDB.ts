import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", true);

const MONGO_URI = process.env.MONGO_URI as string;

export const connect = () => {
  mongoose.connect(MONGO_URI, () => {
    console.log("connected to DB");
  });
};
