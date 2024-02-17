import express from "express";
import { deleteUser, updateUser } from "../controllers/controllers";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
// TODO: forgot password

export default router;
