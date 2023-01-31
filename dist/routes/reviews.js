"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviews_1 = require("../controllers/reviews");
const protectAuth_1 = require("../middlewares/protectAuth");
const router = express_1.default.Router();
router.use(protectAuth_1.protectAuth);
router.route("/:propertyId").post(reviews_1.addReview);
exports.default = router;
