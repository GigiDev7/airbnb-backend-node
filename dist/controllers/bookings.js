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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBooking = exports.updateBooking = exports.getBookingsForProperty = exports.getPersonalBookings = exports.createBooking = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookings_1 = require("../services/bookings");
const createBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let _a = req.body, { propertyId } = _a, details = __rest(_a, ["propertyId"]);
        propertyId = new mongoose_1.default.Types.ObjectId(propertyId);
        const userId = req.user._id;
        const booking = yield (0, bookings_1.addBooking)(userId, propertyId, details);
        res.status(201).json(booking);
    }
    catch (error) {
        next(error);
    }
});
exports.createBooking = createBooking;
const getPersonalBookings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const bookings = yield (0, bookings_1.getBookingsByUserOrProperty)(userId, "User", req.query);
        res.status(200).json(bookings);
    }
    catch (error) {
        next(error);
    }
});
exports.getPersonalBookings = getPersonalBookings;
const getBookingsForProperty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const propertyId = new mongoose_1.default.Types.ObjectId(req.params.propertyId);
        const bookings = yield (0, bookings_1.getBookingsByUserOrProperty)(propertyId, "Property", req.query);
        res.status(200).json(bookings);
    }
    catch (error) {
        next(error);
    }
});
exports.getBookingsForProperty = getBookingsForProperty;
const updateBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingId = new mongoose_1.default.Types.ObjectId(req.params.bookingId);
        const userId = req.user._id;
        yield (0, bookings_1.findBookingAndUpdate)(bookingId, userId, req.body);
        res.status(200).json({ message: "Bookings updated successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.updateBooking = updateBooking;
const removeBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingId = new mongoose_1.default.Types.ObjectId(req.params.bookingId);
        const userId = req.user._id;
        yield (0, bookings_1.deleteBooking)(bookingId, userId);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
exports.removeBooking = removeBooking;
