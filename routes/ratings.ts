import express from "express";
import { addNewRating, updateRating } from "../controllers/ratings";
import { protectAuth } from "../middlewares/protectAuth";
import { validationHandler } from "../middlewares/validationHandler";
import { ratingValidator } from "../middlewares/validators/ratingsValidator";

const router = express.Router();

router.use(protectAuth);

router
  .route("/property/:propertyId")
  .post(ratingValidator, validationHandler, addNewRating);
router.route("/:ratingId").patch(updateRating);

export default router;
