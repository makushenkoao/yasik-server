import express from "express";
import {getUserDataByToken, login, register} from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/", getUserDataByToken);

export default router;