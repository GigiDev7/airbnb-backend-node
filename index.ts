import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
