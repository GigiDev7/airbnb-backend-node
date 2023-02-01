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
exports.patchRating = exports.addRating = void 0;
const ratingSchema_1 = __importDefault(require("../models/ratingSchema"));
const checkUser_1 = require("../utils/checkUser");
const addRating = (userId, propertyId, rating) => {
    return ratingSchema_1.default.create({ user: userId, propertyId, rating });
};
exports.addRating = addRating;
const patchRating = (ratingId, userId, rating) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield ratingSchema_1.default.findById(ratingId);
    (0, checkUser_1.checkUser)(doc, userId, "Rating");
    yield doc.updateOne({ rating });
});
exports.patchRating = patchRating;
