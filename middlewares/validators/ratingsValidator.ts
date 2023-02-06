import { checkSchema } from "express-validator";

export const ratingValidator = checkSchema({
  rating: {
    in: ["body"],
    exists: true,
    errorMessage: "Rating is required",
    isNumeric: {
      errorMessage: "Rating must be between 0 and 5",
    },
  },
});
