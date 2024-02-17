import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "../src/routes/auth.js";
import userRoutes from "../src/routes/users.js";
import sessionsRoutes from "../src/routes/sessions";
import favoritesRoutes from "../src/routes/favorites";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sessions", sessionsRoutes);
app.use("/api/favorites.js", favoritesRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB CONNECTED!!!");
  })
  .catch((error) => console.log(`${error} did not connect`));

module.exports = app;
