import React from "react"; 
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/media-details", {
      state: { media: movie, type: movie.title ? "movie" : "tv" },
    });
  };

  const title = movie.title || movie.name || "Sem título";
  const year = (movie.release_date || movie.first_air_date || "").split("-")[0];
  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=Sem+Imagem";

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <div className="movie-card" onClick={handleClick}>
      <img src={image} alt={title} />
      <div className="movie-info">
        <h3>{title}</h3>
        <p>{year}</p>
        <p className="movie-rating">⭐ {rating}</p>
      </div>
    </div>
  );
}

export default MovieCard;
