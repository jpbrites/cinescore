import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("userId"); // verifica se o usuário está salvo

  if (!user) {
    // se não estiver logado, redireciona para login
    return <Navigate to="/login" replace />;
  }

  return children; // se estiver logado, mostra o conteúdo normalmente
}
