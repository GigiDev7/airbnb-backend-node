"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = void 0;
const customError_1 = require("./customError");
const checkUser = (doc, userId, type) => {
    if (!doc) {
        throw new customError_1.CustomError("NotFoundError", `${type} not found`);
    }
    if (type === "Property") {
        if (!doc.createdBy.equals(userId)) {
            throw new customError_1.CustomError("Authorization Error", "You are not authorized to continue");
        }
    }
    else {
        if (!doc.user.equals(userId)) {
            throw new customError_1.CustomError("Authorization Error", "You are not authorized to continue");
        }
    }
};
exports.checkUser = checkUser;
