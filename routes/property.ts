import express from "express";
import {
  addProperty,
  getProperties,
  getSingleProperty,
} from "../controllers/property";
import { protectAuth } from "../middlewares/protectAuth";

const router = express.Router();

router.route("").post(protectAuth, addProperty).get(getProperties);
router.route("/:propertyId").get(getSingleProperty);

export default router;
