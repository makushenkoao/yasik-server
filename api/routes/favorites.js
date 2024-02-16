import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  addToFavorites,
  getFavoritesByUserId,
  removeFromFavorites,
} from "../controllers/favorites";

const router = express.Router();

router.post("/", verifyToken, addToFavorites);
router.delete("/", verifyToken, removeFromFavorites);
router.get("/:userId", verifyToken, getFavoritesByUserId);

export default router;
