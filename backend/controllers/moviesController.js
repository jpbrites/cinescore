import dotenv from "dotenv";
dotenv.config();

import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

console.log("🔑 TMDB_API_KEY:", TMDB_API_KEY);

export const getAllMedia = async (req, res) => {
  const { page = 1, type = "movie", genre } = req.query; // adiciona genre

  if (!["movie", "tv"].includes(type)) {
    return res.status(400).json({ message: "Tipo inválido. Use 'movie' ou 'tv'." });
  }

  try {
    const genreQuery = genre ? `&with_genres=${genre}` : "";

    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/${type}?api_key=${TMDB_API_KEY}&language=pt-BR&page=${page}${genreQuery}`
    );

    res.json({
      page: response.data.page,
      total_pages: response.data.total_pages,
      results: response.data.results,
    });
  } catch (error) {
    console.error(`Erro ao buscar ${type === "movie" ? "filmes" : "séries"}:`, error.message);
    res.status(500).json({ message: `Erro ao buscar ${type === "movie" ? "filmes" : "séries"}.` });
  }
};

export const getAllCategories = async (req, res) => {
  const { type = "movie" } = req.query;

  if (!["movie", "tv"].includes(type)) {
    return res.status(400).json({ message: "Tipo inválido. Use 'movie' ou 'tv'." });
  }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${TMDB_API_KEY}&language=pt-BR`
    );

    res.json(response.data.genres);
  } catch (error) {
    console.error(`Erro ao buscar categorias:`, error.message);
    res.status(500).json({ message: "Erro ao buscar categorias." });
  }
};

export const searchMedia = async (req, res) => {
  const { query, type = "movie", page = 1 } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Parâmetro 'query' é obrigatório." });
  }

  if (!["movie", "tv"].includes(type)) {
    return res.status(400).json({ message: "Tipo inválido. Use 'movie' ou 'tv'." });
  }

  try {
    const url = `https://api.themoviedb.org/3/search/${type}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR&page=${page}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(`Erro ao buscar ${type === "movie" ? "filmes" : "séries"}:`, error.response?.data || error.message);
    res.status(500).json({ message: `Erro ao buscar ${type === "movie" ? "filmes" : "séries"}.` });
  }
};



export const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=pt-BR`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Erro ao buscar detalhes do filme:", error.response?.data || error.message);
    res.status(500).json({ message: "Erro ao buscar detalhes do filme." });
  }
};