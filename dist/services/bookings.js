"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.findBookingAndUpdate = exports.getBookingsByUserOrProperty = exports.addBooking = void 0;
const bookingSchema_1 = __importDefault(require("../models/bookingSchema"));
const checkUser_1 = require("../utils/checkUser");
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
const findBookingAndUpdate = (bookingId, userId, bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield bookingSchema_1.default.findById(bookingId);
    (0, checkUser_1.checkUser)(booking, userId, "Booking");
    yield booking.updateOne(bookingData);
});
exports.findBookingAndUpdate = findBookingAndUpdate;
const deleteBooking = (bookingId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield bookingSchema_1.default.findById(bookingId);
    (0, checkUser_1.checkUser)(booking, userId, "Booking");
    yield booking.deleteOne();
});
exports.deleteBooking = deleteBooking;
