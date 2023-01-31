import express from "express";
import { addProperty } from "../controllers/property";

const router = express.Router();

router.route("").post(addProperty);

export default router;
