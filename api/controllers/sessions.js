import Session from "../models/Session.js";
import { v4 as uuidv4 } from "uuid";

export const createSession = async (req, res) => {
  try {
    const { creator, genres } = req.body;

    const uuid = uuidv4();

    const code = uuid.slice(0, 10);

    const newSession = new Session({
      creator,
      genres,
      code,
    });

    await newSession.save();

    res.status(201).json(newSession);
  } catch (error) {
    // В случае ошибки отправляем клиенту сообщение об ошибке
    res.status(500).json({ message: error.message });
  }
};

export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    res.status(200).json(sessions);
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

const getSessionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const sessions = await Session.find({ participants: userId });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const joinSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const session = await Session.findById(id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    session.participants.push(userId);

    await session.save();

    res.status(200).json({ message: "Joined session successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    // В случае ошибки отправляем лиенту сообщение об ошибке
    res.status(500).json({ message: error.message });
  }
};
