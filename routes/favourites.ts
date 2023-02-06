import express from "express";
import {
  addFavourite,
  getFavourites,
  removeFavourite,
} from "../controllers/favourites";
import { protectAuth } from "../middlewares/protectAuth";
import { validationHandler } from "../middlewares/validationHandler";
import { favouritesValidator } from "../middlewares/validators/favouritesValidators";

const router = express.Router();

router.use(protectAuth);

router
  .route("")
  .get(getFavourites)
  .post(favouritesValidator, validationHandler, addFavourite)
  .patch(favouritesValidator, validationHandler, removeFavourite);

export default router;
