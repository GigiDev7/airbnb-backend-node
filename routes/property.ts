import express from "express";
import { addProperty, getProperties } from "../controllers/property";
import { protectAuth } from "../middlewares/protectAuth";

const router = express.Router();

router.route("").post(protectAuth, addProperty).get(getProperties);

export default router;
