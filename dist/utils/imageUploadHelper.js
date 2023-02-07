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
exports.updateImageFiles = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const updateImageFiles = (images, type, propertyId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const imgDir = path_1.default.join(process.cwd(), "uploads", type, userId ? userId.toString() : propertyId.toString());
    const oldImages = yield promises_1.default.readdir(imgDir);
    const newImages = images.map((img) => {
        const ind = img.lastIndexOf("\\");
        //const ind = img.lastIndexOf("/");
        return img.slice(ind + 1);
    });
    oldImages.forEach((img) => __awaiter(void 0, void 0, void 0, function* () {
        if (!newImages.includes(img)) {
            yield promises_1.default.unlink(path_1.default.join(imgDir, img));
        }
    }));
});
exports.updateImageFiles = updateImageFiles;
