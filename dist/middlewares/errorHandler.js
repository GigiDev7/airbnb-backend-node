"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    if (err.name === "Not Found Error") {
        res.status(404).json({ message: err.message || "Something went wrong" });
    }
    else if (err.name === "Authentication Error") {
        res.status(404).json({ message: err.message || "Something went wrong" });
    }
    else if (err.name === "Validation Error") {
        res.status(403).json({ message: err.message || "Something went wrong" });
    }
    else {
        res.status(500).json(err);
    }
};
exports.errorHandler = errorHandler;
