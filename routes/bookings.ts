import express from "express";
import { createBooking, getPersonalBookings } from "../controllers/bookings";
import { protectAuth } from "../middlewares/protectAuth";

const router = express.Router();

router.use(protectAuth);

router.route("").post(createBooking).get(getPersonalBookings);

export default router;
