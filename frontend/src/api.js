// src/api.js
import Cookies from "js-cookie";

const API_URL = "http://localhost:5000/api"; // backend local

export async function registerUser(data) {
  const response = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Erro ao registrar usuário");
  }

  return await response.json();
}

export async function login(email, password) {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao fazer login");
  }

  return response.json();
}

export async function searchMedia(query, type = "movie", page = 1) {
  const url = `${API_URL}/movies/search?query=${encodeURIComponent(query)}&type=${type}&page=${page}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Erro ao buscar ${type === "movie" ? "filmes" : "séries"}`);
  return await response.json();
}


export async function getAllMedia(page = 1, type = "movie", genre = "") {
  const url = `${API_URL}/movies/allMedia?page=${page}&type=${type}${genre ? `&genre=${genre}` : ""}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Erro ao buscar mídia");
  return await response.json();
}


export async function getAllCategories(type = "movie") {
  const response = await fetch(`${API_URL}/movies/allCategories?type=${type}`);
  if (!response.ok) throw new Error("Erro ao buscar categorias");
  return await response.json(); 
}

export async function getMovieDetails(id) {
  const response = await fetch(`${API_URL}/movies/${id}`);
  if (!response.ok) throw new Error("Erro ao buscar detalhes");
  return await response.json();
}


// 🔥 FAVORITOS
export const getFavorites = async (userId) => {
  try {
    const res = await fetch(`${API_URL}/favorites/${userId}`);
    if (!res.ok) throw new Error("Erro ao buscar favoritos");
    return await res.json();
  } catch (error) {
    console.error("Erro ao obter favoritos:", error);
    return [];
  }
};

export const addFavorite = async (userId, movieData) => {
  const response = await fetch(`${API_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, movieData }),
  });
  return response.json();
};


export const removeFavorite = async (userId, movieId) => {
  try {
    const res = await fetch(`${API_URL}/favorites/${userId}/${movieId}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Erro ao remover favorito");
    return await res.json();
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
    throw error;
  }
};

export async function generateShareLink() {
  const token = Cookies.get("authToken");
  const response = await fetch(`${API_URL}/auth/share`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Erro ao gerar link de compartilhamento.");
  return response.json();
}

export async function getSharedFavorites(token) {
  const response = await fetch(`${API_URL}/favorites/share/${token}`);
  if (!response.ok) throw new Error("Link inválido.");
  return response.json();
}
