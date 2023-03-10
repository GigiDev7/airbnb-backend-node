import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import { connect } from "./connectDB";
import userRouter from "./routes/user";
import propertyRouter from "./routes/property";
import reviewsRouter from "./routes/reviews";
import ratingsRouter from "./routes/ratings";
import bookingsRouter from "./routes/bookings";
import favouritesRouter from "./routes/favourites";
import imagesRouter from "./routes/images";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/user", userRouter);
app.use("/property", propertyRouter);
app.use("/reviews", reviewsRouter);
app.use("/ratings", ratingsRouter);
app.use("/bookings", bookingsRouter);
app.use("/favourites", favouritesRouter);
app.use("/images", imagesRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connect();
  console.log(`listening on port ${PORT}`);
});
