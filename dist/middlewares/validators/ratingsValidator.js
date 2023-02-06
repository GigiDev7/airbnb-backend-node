"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingValidator = void 0;
const express_validator_1 = require("express-validator");
exports.ratingValidator = (0, express_validator_1.checkSchema)({
    rating: {
        in: ["body"],
        exists: true,
        errorMessage: "Rating is required",
        isNumeric: {
            errorMessage: "Rating must be between 0 and 5",
        },
    },
});
