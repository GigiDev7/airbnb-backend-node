import mongoose from "mongoose";
import { CustomError } from "./customError";

export const checkUser = (
  doc: any,
  userId: mongoose.Types.ObjectId,
  type: "Review" | "Rating" | "Booking" | "Property"
) => {
  if (!doc) {
    throw new CustomError("NotFoundError", `${type} not found`);
  }

  if (type === "Property") {
    if (!doc.createdBy.equals(userId)) {
      throw new CustomError(
        "Authorization Error",
        "You are not authorized to continue"
      );
    }
  } else {
    if (!doc.user.equals(userId)) {
      throw new CustomError(
        "Authorization Error",
        "You are not authorized to continue"
      );
    }
  }
};
