import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getFavorites, removeFavorite } from "../../api";
import ModalMessage from "../../components/modal-message/ModalMessage";
import "./Favorites.css";
import { generateShareLink } from "../../api";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");
  const [modal, setModal] = useState({ show: false, message: "", type: "" });

  const navigate = useNavigate();

  const handleShare = async () => {
  try {
    const { link } = await generateShareLink();
    navigator.clipboard.writeText(link);
    setModal({ show: true, message: "Link copiado para a área de transferência!", type: "success" });
  } catch (err) {
    setModal({ show: true, message: "Erro ao gerar link.", type: "error" });
  }
};

  const displayModal = (message, type) => {
    setModalMessage(message);
    setModalType(type);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000); 
  };

  useEffect(() => {
    const user = localStorage.getItem("userId");
    if (!user) {
      navigate("/login");
      return;
    }
    setName(localStorage.getItem("userName"));

    async function fetchFavorites() {
      try {
        const data = await getFavorites(user);
        setFavorites(data.favorites || []);
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
        displayModal("Erro ao carregar favoritos.", "error");
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, [navigate]);

  const handleRemove = async (movieId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      displayModal("Usuário não autenticado.", "error");
      return;
    }

    try {
      await removeFavorite(userId, movieId);
      setFavorites((prev) => prev.filter((fav) => fav.id !== movieId));
      displayModal("Removido dos favoritos com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      displayModal("Erro ao remover dos favoritos.", "error");
    }
  };

  if (loading) {
    return (
      <div className="favorites-loading">
        <div className="favorites-spinner"></div>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <span className="favorites-title">Olá, {name}</span>
      <p className="favorites-subtitle">Veja aqui sua lista de favoritos</p>

      {favorites.length > 0 && (
      <button className="favorite-btn" onClick={handleShare}>
        Compartilhar lista
      </button>
    )}

    {modal.show && (
      <ModalMessage
        message={modal.message}
        type={modal.type}
        onClose={() => setModal({ ...modal, show: false })}
      />
    )}

      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <p className="favorites-empty-text">Você ainda não tem favoritos 😔</p>
          <Link className="favorites-empty-link" to="/movies">
            Explorar filmes e séries
          </Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((item) => (
            <div key={item.id} className="favorites-card">
              <img
                className="favorites-image"
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title}
              />
              <div className="favorites-info">
                <h2 className="favorites-name">{item.title}</h2>

                <div className="favorites-rating">
                  <span className="favorites-star">⭐</span>
                  <span className="favorites-score">
                    {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
                  </span>
                </div>

                <button
                  className="favorites-remove"
                  onClick={() => handleRemove(item.id)}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <ModalMessage
          message={modalMessage}
          type={modalType}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
