import express from "express";
import {
  createBooking,
  getPersonalBookings,
  getBookingsForProperty,
  updateBooking,
  removeBooking,
} from "../controllers/bookings";
import { protectAuth } from "../middlewares/protectAuth";
import { validationHandler } from "../middlewares/validationHandler";
import { createBookingValidator } from "../middlewares/validators/bookingsValidators";

const router = express.Router();

router.use(protectAuth);

router
  .route("")
  .post(createBookingValidator, validationHandler, createBooking)
  .get(getPersonalBookings);
router.route("/property/:propertyId").get(getBookingsForProperty);
router.route("/:bookingId").patch(updateBooking).delete(removeBooking);

export default router;
