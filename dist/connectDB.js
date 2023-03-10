"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.set("strictQuery", true);
const MONGO_URI = process.env.MONGO_URI;
const connect = () => {
    mongoose_1.default.connect(MONGO_URI, () => {
        console.log("connected to DB");
    });
};
exports.connect = connect;
