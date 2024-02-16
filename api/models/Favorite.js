import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema(
  {
    userId: String,
    movieId: String,
    title: String,
    backdrop_path: String,
  },
  { timestamps: true },
);

const Favorite = mongoose.model("Favorite", FavoriteSchema);
export default Favorite;
