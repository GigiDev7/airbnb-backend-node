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
exports.findSingleProperty = exports.findProperties = exports.createProperty = void 0;
const propertySchema_1 = __importDefault(require("../models/propertySchema"));
const ratingSchema_1 = __importDefault(require("../models/ratingSchema"));
const reviewSchema_1 = __importDefault(require("../models/reviewSchema"));
const createProperty = (propertyData) => {
    return propertySchema_1.default.create(propertyData);
};
exports.createProperty = createProperty;
const findProperties = () => {
    return propertySchema_1.default.find().populate("createdBy", "-password -__v");
};
exports.findProperties = findProperties;
const findSingleProperty = (propertyId) => __awaiter(void 0, void 0, void 0, function* () {
    const property = propertySchema_1.default.findById(propertyId)
        .populate("createdBy", "-password -__v")
        .exec();
    const ratings = ratingSchema_1.default.find({ propertyId }).populate("author").exec();
    const reviews = reviewSchema_1.default.find({ propertyId }).populate("author").exec();
    const result = yield Promise.all([property, ratings, reviews]);
    return result;
});
exports.findSingleProperty = findSingleProperty;
