import mongoose from "mongoose";
import { Request } from "express";

export interface CustomRequest extends Request {
  user: IUser;
}

export interface IUser {
  _id: mongoose.Types.ObjectId;
  firstname: string;
  lastname: string;
  email?: string;
  password: string;
  image?: string;
  favourites?: mongoose.Types.ObjectId[];
}

type Location = {
  country: string;
  city: string;
  address: string;
};

type Rooms = {
  total: number;
  bedrooms: number;
  bathrooms: number;
};

type Rating = {
  author: mongoose.Types.ObjectId;
  rating: number;
};

type Review = {
  author: mongoose.Types.ObjectId;
  review: string;
};

interface IBooking {
  user: mongoose.Types.ObjectId;
  property: mongoose.Types.ObjectId;
  checkin: Date;
  checkout: Date;
  guests: number;
  totalPrice: number;
}

export interface IProperty {
  createdBy: mongoose.Types.ObjectId;
  title: string;
  description: string;
  location: Location;
  maxGuests: number;
  rooms: Rooms;
  bedsQuantity: number;
  images: string[];
  price: number;
  amenities: string[];
  propertyType: string;
  typeOfPlace: string;
}
