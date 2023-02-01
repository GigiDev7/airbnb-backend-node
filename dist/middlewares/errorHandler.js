"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    if (err.name === "Not Found Error" || err.name === "NotFoundError") {
        res.status(404).json({ message: err.message || "Something went wrong" });
    }
    else if (err.name === "Authentication Error") {
        res.status(403).json({ message: err.message || "Something went wrong" });
    }
    else if (err.name === "Authorization Error") {
        res.status(403).json({ message: err.message || "Something went wrong" });
    }
    else if (err.name === "Validation Error") {
        res.status(422).json({ message: err.message || "Something went wrong" });
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        res.status(422).json({ message: "User already exists" });
    }
    else {
        res.status(500).json(err);
    }
};
exports.errorHandler = errorHandler;
