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
exports.updateProfileImage = exports.updatePropertyImages = void 0;
const propertySchema_1 = __importDefault(require("../models/propertySchema"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const checkUser_1 = require("../utils/checkUser");
const customError_1 = require("../utils/customError");
const imageUploadHelper_1 = require("../utils/imageUploadHelper");
const updatePropertyImages = (files, propertyId, images, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const property = yield propertySchema_1.default.findById(propertyId);
    if (!property) {
        throw new customError_1.CustomError("NotFoundError", "Property not found");
    }
    (0, checkUser_1.checkUser)(property, userId, "Property");
    if (!files) {
        yield (0, imageUploadHelper_1.updateImageFiles)(images, "properties", propertyId);
        property.images = images;
    }
    else {
        let paths = files.map((file) => file.path);
        if (images) {
            paths = [...paths, ...images];
            yield (0, imageUploadHelper_1.updateImageFiles)(paths, "properties", propertyId);
        }
        property.images = paths;
    }
    yield property.save();
    return property;
});
exports.updatePropertyImages = updatePropertyImages;
const updateProfileImage = (file, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userSchema_1.default.findById(userId);
    if (!user) {
        throw new customError_1.CustomError("NotFoundError", "User not found");
    }
    if (file) {
        (0, imageUploadHelper_1.updateImageFiles)([file.path], "users", undefined, userId);
        user.image = file.path;
        yield user.save();
    }
    return user;
});
exports.updateProfileImage = updateProfileImage;
