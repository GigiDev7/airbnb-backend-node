import express from "express";
import { addNewRating, updateRating } from "../controllers/ratings";
import { protectAuth } from "../middlewares/protectAuth";

const router = express.Router();

router.use(protectAuth);

router.route("/property/:propertyId").post(addNewRating);
router.route("/:ratingId").patch(updateRating);

export default router;
