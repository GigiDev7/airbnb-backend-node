import mongoose from "mongoose";

interface IBooking {
  user: mongoose.Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
}

interface IReserver {
  property: mongoose.Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
}

export interface IUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  image?: string;
  favourites?: mongoose.Types.ObjectId[];
  reserverd?: IReserver[];
}
