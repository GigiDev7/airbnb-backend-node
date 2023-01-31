import express from "express";
import { addProperty } from "../controllers/property";
import { protectAuth } from "../middlewares/protectAuth";

const router = express.Router();

router.route("").post(protectAuth, addProperty);

export default router;
