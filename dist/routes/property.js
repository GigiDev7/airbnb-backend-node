"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const property_1 = require("../controllers/property");
const protectAuth_1 = require("../middlewares/protectAuth");
const router = express_1.default.Router();
router.route("").post(protectAuth_1.protectAuth, property_1.addProperty).get(property_1.getProperties);
router
    .route("/:propertyId")
    .get(property_1.getSingleProperty)
    .delete(protectAuth_1.protectAuth, property_1.deleteProperty)
    .put(protectAuth_1.protectAuth, property_1.updateProperty);
exports.default = router;
