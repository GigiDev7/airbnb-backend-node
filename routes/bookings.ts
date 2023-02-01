import express from "express";
import { createBooking } from "../controllers/bookings";
import { protectAuth } from "../middlewares/protectAuth";

const router = express.Router();

router.use(protectAuth);

router.route("").post(createBooking);

export default router;
