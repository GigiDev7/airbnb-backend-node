import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import { connect } from "./connectDB";
import userRouter from "./routes/user";
import propertyRouter from "./routes/property";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/property", propertyRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connect();
  console.log(`listening on port ${PORT}`);
});
