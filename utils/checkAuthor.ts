import mongoose from "mongoose";
import { CustomError } from "./customError";

export const checkAuthor = (
  doc: any,
  userId: mongoose.Types.ObjectId,
  type: "Review" | "Rating"
) => {
  if (!doc) {
    throw new CustomError("NotFoundError", `${type} not found`);
  }

  if (!doc.author.equals(userId)) {
    throw new CustomError(
      "Authorization Error",
      "You are not authorized to continue"
    );
  }
};
