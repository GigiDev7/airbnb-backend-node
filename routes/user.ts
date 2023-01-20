import express from "express";
import { signIn, signUp } from "../controllers/user";
import { validationHandler } from "../middlewares/validationHandler";
import {
  loginValidator,
  registerValidator,
} from "../middlewares/validators/userValidators";

const router = express.Router();

router.route("/login").post(loginValidator, validationHandler, signIn);
router.route("/register").post(registerValidator, validationHandler, signUp);

export default router;
