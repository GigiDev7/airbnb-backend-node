"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthor = void 0;
const customError_1 = require("./customError");
const checkAuthor = (doc, userId, type) => {
    if (!doc) {
        throw new customError_1.CustomError("NotFoundError", `${type} not found`);
    }
    if (!doc.author.equals(userId)) {
        throw new customError_1.CustomError("Authorization Error", "You are not authorized to continue");
    }
};
exports.checkAuthor = checkAuthor;
