"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProperties = exports.createProperty = void 0;
const propertySchema_1 = __importDefault(require("../models/propertySchema"));
const createProperty = (propertyData) => {
    return propertySchema_1.default.create(propertyData);
};
exports.createProperty = createProperty;
const findProperties = () => {
    return propertySchema_1.default.find().populate("createdBy ratings reviews", "-password -__v");
};
exports.findProperties = findProperties;
