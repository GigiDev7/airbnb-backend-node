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
exports.removeFavourite = exports.addFavourite = exports.getFavourites = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const favourites_1 = require("../services/favourites");
const getFavourites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const favourites = yield (0, favourites_1.getFavouritesByUser)(userId);
        res.status(200).json(favourites);
    }
    catch (error) {
        next(error);
    }
});
exports.getFavourites = getFavourites;
const addFavourite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const propertyId = new mongoose_1.default.Types.ObjectId(req.body.propertyId);
        yield (0, favourites_1.addToFavourites)(userId, propertyId);
        res.status(201).json({ message: "Successfully added to favorites" });
    }
    catch (error) {
        next(error);
    }
});
exports.addFavourite = addFavourite;
const removeFavourite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const propertyId = new mongoose_1.default.Types.ObjectId(req.body.propertyId);
        yield (0, favourites_1.removeFromFavourites)(userId, propertyId);
        res.status(200).json({ message: "Successfully removed from favorites" });
    }
    catch (error) {
        next(error);
    }
});
exports.removeFavourite = removeFavourite;
