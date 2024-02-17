import express from "express";
import {
  createSession,
  getSessionById,
  joinSession,
} from "../controllers/sessions";

const router = express.Router();

// router.get("/", getAllSessions);
router.get("/:id", getSessionById);
router.post("/", createSession);
router.post("/join", joinSession);
// TODO
// router.post("/:id/matches", addMatchesToSession);
// router.post("/:id/genres", updateGenres);

export default router;
