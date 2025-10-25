import mongoose from "mongoose";

const favoriteListSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, 
  movies: [
    {
      id: Number,
      title: String,
      poster_path: String,
      vote_average: Number,
      overview: String, 
    },
  ],
});

export default mongoose.model("FavoriteList", favoriteListSchema);
