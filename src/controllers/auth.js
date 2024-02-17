import bcrypt from "bcrypt";
import User from "../models/User";
import jwt from "jsonwebtoken";

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
