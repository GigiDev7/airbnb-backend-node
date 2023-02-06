import express from "express";
import {
  addFavourite,
  getFavourites,
  removeFavourite,
} from "../controllers/favourites";
import { protectAuth } from "../middlewares/protectAuth";

const router = express.Router();

router.use(protectAuth);

router.route("").get(getFavourites).post(addFavourite).patch(removeFavourite);

export default router;
