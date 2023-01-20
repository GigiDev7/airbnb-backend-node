"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidator = exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidator = (0, express_validator_1.checkSchema)({
    email: {
        in: ["body"],
        isEmail: {
            errorMessage: "Please enter a valid email",
        },
    },
    password: {
        in: ["body"],
        isLength: {
            options: { min: 6 },
            errorMessage: "Password must be at least 6 characters long",
        },
    },
});
exports.registerValidator = (0, express_validator_1.checkSchema)({
    email: {
        in: ["body"],
        isEmail: {
            errorMessage: "Please enter a valid email",
        },
    },
    password: {
        in: ["body"],
        isLength: {
            options: { min: 6 },
            errorMessage: "Password must be at least 6 characters long",
        },
    },
});
