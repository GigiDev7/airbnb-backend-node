import express from "express";
import {
  addProperty,
  deleteProperty,
  getProperties,
  getSingleProperty,
  updateProperty,
} from "../controllers/property";
import { protectAuth } from "../middlewares/protectAuth";

const router = express.Router();

router.route("").post(protectAuth, addProperty).get(getProperties);
router
  .route("/:propertyId")
  .get(getSingleProperty)
  .delete(protectAuth, deleteProperty)
  .put(protectAuth, updateProperty);

export default router;
