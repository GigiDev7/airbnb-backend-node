import express from "express";
import { addReview } from "../controllers/reviews";
import { protectAuth } from "../middlewares/protectAuth";

const router = express.Router();

router.use(protectAuth);

router.route("/:propertyId").post(addReview);

export default router;
