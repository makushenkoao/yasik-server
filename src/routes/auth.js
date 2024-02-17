import express from "express";
import {
  getUserDataByToken,
  login,
  register,
  updatePassword,
} from "../controllers/auth";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/update-password", updatePassword);
router.post("/", getUserDataByToken);

export default router;
