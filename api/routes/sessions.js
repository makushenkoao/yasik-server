import express from "express";
import {
  addMatchesToSession,
  createSession,
  getAllSessions,
  getSessionById,
  joinSession, updateGenres,
} from "../controllers/sessions";

const router = express.Router();

router.get("/", getAllSessions);
router.get("/:id", getSessionById);
router.post("/", createSession);
router.post("/join", joinSession);
router.post("/:id/matches", addMatchesToSession);
router.post("/:id/genres", updateGenres);

export default router;
