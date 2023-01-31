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
exports.protectAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const protectAuth = (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.split(" ")[1]) {
        return res.status(403).json({ message: "Authorization failed" });
    }
    const token = req.headers.authorization.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decodedData) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(403).json({ message: "Authorization failed" });
        }
        const user = yield userSchema_1.default.findById(decodedData.id, "-password");
        if (user) {
            req.user = user;
        }
        else {
            return res.status(403).json({ message: "Invalid credentials" });
        }
        next();
    }));
};
exports.protectAuth = protectAuth;
