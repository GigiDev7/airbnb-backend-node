import express from "express";
import { addReview, deleteReview, updateReview } from "../controllers/reviews";
import { protectAuth } from "../middlewares/protectAuth";

const router = express.Router();

router.use(protectAuth);

router.route("/property/:propertyId").post(addReview);
router.route("/:reviewId").delete(deleteReview).patch(updateReview);

export default router;
