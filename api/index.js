import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "../routes/auth.js";
import userRoutes from "../routes/users.js";
import { sayHello } from "./function";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.get("/test", sayHello);

app.get('/api', (req, res) => {
    res.send('HELLO')
});


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // .then(() => {
  //   app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  // })
  .catch((error) => console.log(`${error} did not connect`));

module.exports = app;
