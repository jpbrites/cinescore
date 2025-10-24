// models/FavoriteList.js
import mongoose from "mongoose";

const favoriteListSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // cada usuário tem sua lista
  movies: [
    {
      id: Number,
      title: String,
      poster_path: String,
      vote_average: Number,
      overview: String, // adiciona o resumo
    },
  ],
});

export default mongoose.model("FavoriteList", favoriteListSchema);
