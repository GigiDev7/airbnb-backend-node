import { checkSchema } from "express-validator";

export const createBookingValidator = checkSchema({
  checkIn: {
    in: ["body"],
    isDate: {
      errorMessage: "Check in date is required",
    },
  },
  checkOut: {
    in: ["body"],
    isDate: {
      errorMessage: "Check out date is required",
    },
  },
  totalPrice: {
    in: ["body"],
    isNumeric: {
      errorMessage: "Total price is required",
    },
  },
  guests: {
    in: ["body"],
    isNumeric: {
      errorMessage: "Number of guests is required",
    },
  },
  propertyId: {
    in: ["body"],
    isString: {
      errorMessage: "Property ID is required",
    },
  },
});
