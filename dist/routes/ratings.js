"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ratings_1 = require("../controllers/ratings");
const protectAuth_1 = require("../middlewares/protectAuth");
const router = express_1.default.Router();
router.use(protectAuth_1.protectAuth);
router.route("/property/:propertyId").post(ratings_1.addNewRating);
router.route("/:ratingId").patch(ratings_1.updateRating);
exports.default = router;
