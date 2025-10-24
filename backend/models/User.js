import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  id: Number,
  title: String,
  poster_path: String,
  vote_average: Number,
  overview: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  favorites: [favoriteSchema],
  shareToken: { type: String, default: null },
});

export default mongoose.model("User", userSchema);
