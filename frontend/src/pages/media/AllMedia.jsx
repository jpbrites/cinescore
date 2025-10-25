import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllMedia, getAllCategories, searchMedia } from "../../api";
import { FaSearch, FaTimes } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import "./AllMedia.css";
import MovieCard from "../../components/movie-card/MovieCard";
import { Link } from "react-router-dom";

function Movies() {
  const location = useLocation();
  const type = location.pathname.includes("/tv") ? "tv" : "movie";

  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false); 

 const fetchMovies = async (page = 1) => {
  try {
    setLoading(true);
    const data = await getAllMedia(page, type, selectedCategory);
    setMovies(data.results || []);
    setTotalPages(data.total_pages || 1);
  } catch (error) {
    console.error(`Erro ao buscar ${type === "movie" ? "filmes" : "séries"}:`, error);
  } finally {
    setLoading(false);
  }
};

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories(type);
      setCategories(data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories(type);
        setCategories(data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };
    fetchCategories();
  }, [type]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let data;
        if (isSearching && searchQuery.trim()) {
          data = await searchMedia(searchQuery, type, currentPage);
        } else {
          data = await getAllMedia(currentPage, type, selectedCategory);
        }

        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error(`Erro ao buscar ${type === "movie" ? "filmes" : "séries"}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, type, selectedCategory, isSearching]); 

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setCurrentPage(1);
      setIsSearching(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
    setIsSearching(false); 
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };
  return (
    <div className="movies-container">
      <h1>{type === "movie" ? "Filmes" : "Séries"}</h1>

      <div className="filters">
        <div className="select-wrapper">
          <MdCategory className="icon" />
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Todas as categorias</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="search-bar">
          <FaSearch className="icon search-icon" onClick={handleSearch} />
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {isSearching && (
            <FaTimes className="icon clear-icon" onClick={clearSearch} />
          )}
        </div>
      </div>

      {loading ? (
        <p className="loading">Carregando...</p>
      ) : (
        <div className="movies-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                />
            ))
          ) : (
            <p>Nenhum {type === "movie" ? "filme" : "série"} encontrado.</p>
          )}
        </div>
      )}

     <div className="pagination-modern">
      <button
        className="page-arrow"
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        ‹
      </button>

      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        let pageNum;
        if (currentPage <= 3) {
          pageNum = i + 1;
        } else if (currentPage >= totalPages - 2) {
          pageNum = totalPages - 4 + i;
        } else {
          pageNum = currentPage - 2 + i;
        }

        return (
          pageNum > 0 &&
          pageNum <= totalPages && (
            <button
              key={pageNum}
              className={`page-number ${
                currentPage === pageNum ? "active" : ""
              }`}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </button>
          )
        );
      })}

      <button
        className="page-arrow"
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    </div>

    </div>
  );
}

export default Movies;
