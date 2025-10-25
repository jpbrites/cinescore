// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../api";
import ModalMessage from "../../components/modal-message/ModalMessage"; 
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ show: false, message: "", type: "info" });

  const navigate = useNavigate();

  const showModal = (message, type) => {
    setModal({ show: true, message, type });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confPassword) {
      showModal("As senhas não coincidem. Tente novamente.", "error");
      setLoading(false);
      return;
    }

    try {
      await registerUser({ name, email, password });

      showModal("Usuário registrado com sucesso! Redirecionando...", "success");

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Erro ao registrar:", error);
      const message =
        error.response?.data?.message ||
        "Falha ao registrar usuário. Verifique os dados e tente novamente.";
      showModal(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-img"></div>
      <div className="register-content">
        <h1>Faça seu cadastro</h1>
        <form onSubmit={handleRegister}>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            placeholder="Insira seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Insira seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="conf-password">Confirme a senha:</label>
          <input
            type="password"
            id="conf-password"
            placeholder="Confirme sua senha"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>

          <span className="warning">
            Já tem uma conta?{" "}
            <Link className="link" to="/login">
              Faça Login
            </Link>
          </span>
        </form>
      </div>

      {modal.show && (
        <ModalMessage
          message={modal.message}
          type={modal.type}
          onClose={() => setModal({ ...modal, show: false })}
        />
      )}
    </div>
  );
}

export default Register;
