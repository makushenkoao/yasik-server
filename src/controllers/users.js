import User from "../models/User";

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
