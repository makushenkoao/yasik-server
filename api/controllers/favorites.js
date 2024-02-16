import Favorite from "../models/Favorite";

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
