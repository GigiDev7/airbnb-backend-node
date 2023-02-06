"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookings_1 = require("../controllers/bookings");
const protectAuth_1 = require("../middlewares/protectAuth");
const validationHandler_1 = require("../middlewares/validationHandler");
const bookingsValidators_1 = require("../middlewares/validators/bookingsValidators");
const router = express_1.default.Router();
router.use(protectAuth_1.protectAuth);
router
    .route("")
    .post(bookingsValidators_1.createBookingValidator, validationHandler_1.validationHandler, bookings_1.createBooking)
    .get(bookings_1.getPersonalBookings);
router.route("/property/:propertyId").get(bookings_1.getBookingsForProperty);
router.route("/:bookingId").patch(bookings_1.updateBooking).delete(bookings_1.removeBooking);
exports.default = router;
