import express from "express";
import { deleteUser, updateUser } from "../controllers/users";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
