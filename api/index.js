// import express from "express";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import helmet from "helmet";
// import morgan from "morgan";
// import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
//
// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors());
//
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
//
// const PORT = process.env.PORT || 6001;
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
//   })
//   .catch((error) => console.log(`${error} did not connect`));

import express from "express";
import { sayHello } from "./function.js";
const app = express();

app.get("/api", sayHello);

module.exports = app;
