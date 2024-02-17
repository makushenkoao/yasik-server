import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Session from "../models/Session.js";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";
import Favorite from "../models/Favorite";

// USERS

export const updateUser = async (req, res) => {
  try {
    console.log("START");
    const { id } = req.params;
    const { name } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name },
      { new: true },
    );

    console.log(updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// FAVORITES

export const addToFavorites = async (req, res) => {
  try {
    const { userId, movieId, title, backdrop_path } = req.body;
    const favorite = new Favorite({
      userId,
      movieId,
      title,
      backdrop_path,
    });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromFavorites = async (req, res) => {
  try {
    const { userId, movieId } = req.body;
    await Favorite.findOneAndDelete({ userId, movieId });
    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFavoritesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorite.find({ userId });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// AUTH

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserDataByToken = async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res.status(401).json({ msg: "No token, authorization denied" });

    const tokenWithoutPrefix = token.replace("Bearer ", "");

    const decoded = jwt.verify(tokenWithoutPrefix, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) return res.status(400).json({ msg: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SESSIONS

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
