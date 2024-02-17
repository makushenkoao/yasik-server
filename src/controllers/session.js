import Session from "../models/Session.js";
import { v4 as uuidv4 } from "uuid";

export const createSession = async (req, res) => {
  try {
    const { creator } = req.body;

    const uuid = uuidv4();

    const code = uuid.slice(0, 10);

    const newSession = new Session({
      creator,
      genres: [],
      code,
      participants: [creator],
    });

    await newSession.save();

    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSessionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const sessions = await Session.find({ participants: userId });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const joinSession = async (req, res) => {
  const { sessionCode, userId } = req.body;

  try {
    const session = await Session.findOne({ code: sessionCode });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    if (!session.participants.includes(userId)) {
      session.participants.push(userId);
      await session.save();
    }

    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addMatchesToSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { matches } = req.body;

    const session = await Session.findById(id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    session.matches = matches;

    await session.save();

    res.status(200).json({ message: "Matches added to session successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGenres = async (req, res) => {
  try {
    const { id } = req.params;
    const { genres } = req.body;

    const session = await Session.findById(id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    session.genres = genres;

    await session.save();

    res.status(200).json({ message: "Genres updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
