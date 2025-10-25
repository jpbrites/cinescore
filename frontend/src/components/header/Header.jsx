import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo_cine.png";
import { Menu, X } from "lucide-react"; 

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    if (storedUser) {
      setIsLoggedIn(true);
      setUserName(storedUser);
    }
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      setIsLoggedIn(false);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="CineScore" />
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <X size={28} color="#fff" /> : <Menu size={28} color="#fff" />}
      </button>

      <nav className="nav-desktop">
        <Link to="/">Início</Link>
        <Link to="/movies">Filmes</Link>
        <Link to="/tv">Séries</Link>
        <Link to="/favorites">Meus Favoritos</Link>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <nav>
          <Link to="/" onClick={() => setMenuOpen(false)}>Início</Link>
          <Link to="/movies" onClick={() => setMenuOpen(false)}>Filmes</Link>
          <Link to="/tv" onClick={() => setMenuOpen(false)}>Séries</Link>
          <Link to="/favorites" onClick={() => setMenuOpen(false)}>Meus Favoritos</Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button id="login">Entrar</button>
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                <button id="register">Cadastre-se</button>
              </Link>
               </>
          ) : (
            <div className="mobile-user">
              <div className="name-user">{firstLetter}</div>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="btn-logout"
                disabled={isLoading}
              >
                {isLoading ? "Saindo..." : "Sair"}
              </button>
            </div>
          )}
        </nav>
      </div>

      {!isLoggedIn ? (
        <div className="conj-buttons">
          <Link to="/login">
            <button id="login">Entrar</button>
          </Link>
          <Link to="/register">
            <button id="register">Cadastre-se</button>
          </Link>
        </div>
      ) : (
        <div className="conj-user">
          <div className="name-user">{firstLetter}</div>
          <button
            onClick={handleLogout}
            className="btn-logout"
            disabled={isLoading}
          >
            {isLoading ? "Saindo..." : "Sair"}
          </button>
        </div>
      )}
    </header>
  );
}
