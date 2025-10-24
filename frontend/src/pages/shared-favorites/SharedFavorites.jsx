import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSharedFavorites } from "../../api";
import "./SharedFavorites.css";

export default function SharedFavorites() {
  const { token } = useParams();
  const [favorites, setFavorites] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getSharedFavorites(token);
        setFavorites(data.favorites);
        setName(data.name);
      } catch (error) {
        console.error(error);
      }
    }
    load();
  }, [token]);

  return (
    <div className="shared-container">
      <h1>Favoritos de {name}</h1>
      <div className="shared-list">
        {favorites.map((movie) => (
          <div key={movie.id} className="shared-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="shared-image"
            />
            <div className="shared-info">
              <h2 className="shared-title">{movie.title}</h2>
              <p className="shared-overview">
                {movie.overview
                  ? movie.overview.length > 250
                    ? movie.overview.slice(0, 250) + "..."
                    : movie.overview
                  : "Sem descrição disponível."}
              </p>
              <div className="shared-rating">
                <span className="shared-star">⭐</span>
                <span className="shared-score">
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
