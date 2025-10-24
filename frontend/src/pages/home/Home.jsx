import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Bem-vindo ao CineScore!</h1>
          <p>Explore nossa vasta gama de filmes e séries</p>
          <p>Junte-se à nossa comunidade e compartilhe seus filmes favoritos</p>
          <div className="buttons">
            <Link to="/movies" className="btn">
              Ver Filmes
            </Link>
            <Link to="/tv" className="btn">
              Ver Séries
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
