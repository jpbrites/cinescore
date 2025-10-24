import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./MediaDetails.css";
import { addFavorite } from "../../api";
import ModalMessage from "../../components/modal-message/ModalMessage";

function MediaDetails() {
  const location = useLocation();
  const mediaDetails = location.state?.media || null;

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");

  const displayModal = (message, type) => {
    setModalMessage(message);
    setModalType(type);
    setShowModal(true);
  };

  if (!mediaDetails) {
    return <p>Detalhes não encontrados.</p>;
  }

  const handleAddFavorite = async () => {
    const user = localStorage.getItem("userId");

    if (!user) {
      displayModal("Você precisa estar logado para adicionar aos favoritos!", "error");
      return;
    }

    const movieData = {
      id: mediaDetails.id,
      title: mediaDetails.title || mediaDetails.name,
      poster_path: mediaDetails.poster_path,
      vote_average: mediaDetails.vote_average,
      overview: mediaDetails.overview,
    };

    try {
      await addFavorite(user, movieData);
      displayModal("Adicionado aos favoritos com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error);
      displayModal("Erro ao adicionar aos favoritos.", "error");
    }
  };

  return (
    <div className="media-details">
      <div
        className="banner"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${mediaDetails.backdrop_path})`,
        }}
      >
        <div className="overlay"></div>
        <div className="details-container">
          <img
            src={`https://image.tmdb.org/t/p/w300${mediaDetails.poster_path}`}
            alt="Capa"
            className="poster"
          />
          <div className="details">
            <span>{mediaDetails.title || mediaDetails.name}</span>

            {mediaDetails.vote_average && (
              <p className="rating">
                ⭐ {mediaDetails.vote_average.toFixed(1)} / 10
              </p>
            )}

            <p>{mediaDetails.overview}</p>

            {mediaDetails.genres && (
              <p>
                <strong>Gêneros:</strong>{" "}
                {mediaDetails.genres.map((g) => g.name).join(", ")}
              </p>
            )}

            {mediaDetails.release_date && (
              <p>
                <strong>Data de lançamento:</strong> {mediaDetails.release_date}
              </p>
            )}

            {mediaDetails.first_air_date && (
              <p>
                <strong>Data de estreia:</strong> {mediaDetails.first_air_date}
              </p>
            )}

            {mediaDetails.runtime && (
              <p>
                <strong>Duração:</strong> {mediaDetails.runtime} minutos
              </p>
            )}

            {mediaDetails.number_of_seasons && (
              <p>
                <strong>Temporadas:</strong> {mediaDetails.number_of_seasons}
              </p>
            )}

            <button className="favorite-btn" onClick={handleAddFavorite}>
              Adicionar aos favoritos
            </button>
          </div>
        </div>
      </div>

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

export default MediaDetails;
