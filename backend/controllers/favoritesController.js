import FavoriteList from "../models/FavoriteList.js";
import User from "../models/User.js";

export const getFavoriteList = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar lista de favoritos." });
  }
};

export const addFavorite = async (req, res) => {
  try {
    const { userId, movieData } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const alreadyFavorite = user.favorites.some(f => f.id === movieData.id);
    if (alreadyFavorite)
      return res.status(400).json({ message: "Filme já está nos favoritos" });

    user.favorites.push(movieData);
    await user.save();

    res.status(200).json({ message: "Favorito adicionado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao adicionar favorito." });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { userId, movieId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    user.favorites = user.favorites.filter((movie) => movie.id != movieId);
    await user.save();

    res.status(200).json({ message: "Filme removido com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao remover favorito." });
  }
};