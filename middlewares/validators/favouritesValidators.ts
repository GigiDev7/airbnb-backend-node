import { checkSchema } from "express-validator";

export const favouritesValidator = checkSchema({
  propertyId: {
    in: ["body"],
    isString: {
      errorMessage: "Property id is required",
    },
  },
});
