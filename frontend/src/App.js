import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import AllMedia from "./pages/media/AllMedia";
import MediaDetails from "./pages/media-details/MediaDetails";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Header from "./components/header/Header";
import Favorites from "./pages/favorites/Favorites";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import SharedFavorites from "./pages/shared-favorites/SharedFavorites";
import "./App.css";
import Cookies from "js-cookie";

export default function App() {
  const location = useLocation();

  // Rotas onde o Header não deve aparecer
  const hideHeaderRoutes = ["/register", "/login"];

  // Esconde o header também se o path começar com "/favorites/share"
  const shouldHideHeader =
    hideHeaderRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/favorites/share");

  return (
    <>
      {!shouldHideHeader && <Header className="header" />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<AllMedia />} />
        <Route path="/tv" element={<AllMedia />} />
        <Route path="/media-details" element={<MediaDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route path="/favorites/share/:token" element={<SharedFavorites />} />
      </Routes>
    </>
  );
}
