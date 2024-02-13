import express from "express";
import {
  addMatchesToSession,
  createSession,
  getAllSessions,
  getSessionById,
  joinSession,
} from "../controllers/sessions";

const router = express.Router();

router.get("/", getAllSessions);
router.get("/:id", getSessionById);
router.post("/", createSession);
router.post("/:id/join", joinSession);
router.post("/:id/matches", addMatchesToSession);

export default router;
