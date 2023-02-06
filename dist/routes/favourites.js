"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const favourites_1 = require("../controllers/favourites");
const protectAuth_1 = require("../middlewares/protectAuth");
const router = express_1.default.Router();
router.use(protectAuth_1.protectAuth);
router.route("").get(favourites_1.getFavourites).post(favourites_1.addFavourite).patch(favourites_1.removeFavourite);
exports.default = router;
