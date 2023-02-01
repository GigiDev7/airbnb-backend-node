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
exports.updateProperty = exports.deleteProperty = exports.getSingleProperty = exports.getProperties = exports.addProperty = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const property_1 = require("../services/property");
const addProperty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const property = yield (0, property_1.createProperty)(Object.assign(Object.assign({}, req.body), { createdBy: req.user._id }));
        res.status(201).json(property);
    }
    catch (error) {
        next(error);
    }
});
exports.addProperty = addProperty;
const getProperties = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const properties = yield (0, property_1.findProperties)();
        res.status(200).json(properties);
    }
    catch (error) {
        next(error);
    }
});
exports.getProperties = getProperties;
const getSingleProperty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const propertyId = new mongoose_1.default.Types.ObjectId(req.params.propertyId);
        const result = yield (0, property_1.findSingleProperty)(propertyId);
        res
            .status(200)
            .json({ property: result[0], ratings: result[1], reviews: result[2] });
    }
    catch (error) {
        next(error);
    }
});
exports.getSingleProperty = getSingleProperty;
const deleteProperty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const propertyId = new mongoose_1.default.Types.ObjectId(req.params.propertyId);
        const userId = req.user._id;
        yield (0, property_1.removeProperty)(propertyId, userId);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProperty = deleteProperty;
const updateProperty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const propertyId = new mongoose_1.default.Types.ObjectId(req.params.propertyId);
        const userId = req.user._id;
        yield (0, property_1.findPropertyAndUpdate)(propertyId, userId, req.body);
        res.status(200).json({ message: " Updated successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.updateProperty = updateProperty;
