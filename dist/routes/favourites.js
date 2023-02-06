"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const favourites_1 = require("../controllers/favourites");
const protectAuth_1 = require("../middlewares/protectAuth");
const validationHandler_1 = require("../middlewares/validationHandler");
const favouritesValidators_1 = require("../middlewares/validators/favouritesValidators");
const router = express_1.default.Router();
router.use(protectAuth_1.protectAuth);
router
    .route("")
    .get(favourites_1.getFavourites)
    .post(favouritesValidators_1.favouritesValidator, validationHandler_1.validationHandler, favourites_1.addFavourite)
    .patch(favouritesValidators_1.favouritesValidator, validationHandler_1.validationHandler, favourites_1.removeFavourite);
exports.default = router;
