"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favouritesValidator = void 0;
const express_validator_1 = require("express-validator");
exports.favouritesValidator = (0, express_validator_1.checkSchema)({
    propertyId: {
        in: ["body"],
        isString: {
            errorMessage: "Property id is required",
        },
    },
});
