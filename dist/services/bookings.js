"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingsByUserOrProperty = exports.addBooking = void 0;
const bookingSchema_1 = __importDefault(require("../models/bookingSchema"));
const addBooking = (userId, propertyId, bookingDetails) => {
    return bookingSchema_1.default.create(Object.assign(Object.assign({}, bookingDetails), { user: userId, property: propertyId }));
};
exports.addBooking = addBooking;
const getBookingsByUserOrProperty = (id, type, query) => {
    const filterObject = {};
    if (type === "User") {
        filterObject.user = id;
    }
    else {
        filterObject.property = id;
    }
    if (query.active) {
        filterObject.checkOut = { $gte: new Date() };
    }
    return bookingSchema_1.default.find(filterObject);
};
exports.getBookingsByUserOrProperty = getBookingsByUserOrProperty;
