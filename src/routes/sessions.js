import express from "express";
import {
  addMatchesToSession,
  createSession,
  getSessionById,
  joinSession, updateGenres,
} from "../controllers/session";

const router = express.Router();

router.get("/:id", getSessionById);
router.post("/", createSession);
router.post("/join", joinSession);
router.post("/:id/matches", addMatchesToSession);
router.post("/:id/genres", updateGenres);

export default router;
