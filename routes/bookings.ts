import express from "express";
import {
  createBooking,
  getPersonalBookings,
  getBookingsForProperty,
} from "../controllers/bookings";
import { protectAuth } from "../middlewares/protectAuth";

const router = express.Router();

router.use(protectAuth);

router.route("").post(createBooking).get(getPersonalBookings);
router.route("/property/:propertyId").get(getBookingsForProperty);

export default router;
