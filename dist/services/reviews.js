"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReview = void 0;
const propertySchema_1 = __importDefault(require("../models/propertySchema"));
const customError_1 = require("../utils/customError");
const createReview = (propertyId, userId, review) => __awaiter(void 0, void 0, void 0, function* () {
    const property = yield propertySchema_1.default.findById(propertyId);
    if (!property) {
        throw new customError_1.CustomError("NotFound Error", "Property not found");
    }
    property.reviews.push({ author: userId, review });
    yield property.save();
    return property;
});
exports.createReview = createReview;
