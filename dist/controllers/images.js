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
exports.uploadProfileImage = exports.uploadPropertyImages = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const images_1 = require("../services/images");
const uploadPropertyImages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingImages = req.body.existingImages
            ? JSON.parse(req.body.existingImages)
            : null;
        const userId = req.user._id;
        const propertyId = new mongoose_1.default.Types.ObjectId(req.params.propertyId);
        const property = yield (0, images_1.updatePropertyImages)(req.files, propertyId, existingImages, userId);
        res.status(200).json({ message: "Images uploaded successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.uploadPropertyImages = uploadPropertyImages;
const uploadProfileImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const user = yield (0, images_1.updateProfileImage)(req.file, userId);
        res.status(200).json({ message: "Profile image uploaded successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.uploadProfileImage = uploadProfileImage;
