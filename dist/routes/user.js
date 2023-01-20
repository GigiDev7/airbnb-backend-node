"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const validationHandler_1 = require("../middlewares/validationHandler");
const userValidators_1 = require("../middlewares/validators/userValidators");
const router = express_1.default.Router();
router.route("/login").post(userValidators_1.loginValidator, validationHandler_1.validationHandler, user_1.signIn);
router.route("/register").post(userValidators_1.registerValidator, validationHandler_1.validationHandler, user_1.signUp);
exports.default = router;
