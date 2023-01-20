import { checkSchema } from "express-validator";

export const loginValidator = checkSchema({
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
