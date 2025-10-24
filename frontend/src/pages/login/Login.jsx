import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { login } from "../../api";
import "./Login.css";
import ModalMessage from "../../components/modal-message/ModalMessage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ show: false, message: "", type: "error" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(email, password);
      Cookies.set("authToken", response.token, { secure: true, sameSite: "strict" });
      localStorage.setItem("userId", response.user.id);
      localStorage.setItem("userName", response.user.name);

      setModal({
        show: true,
        message: "Login realizado com sucesso!",
        type: "success",
      });

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setModal({
        show: true,
        message: err.message || "Erro ao fazer login. Verifique suas credenciais.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-img" />
      <div className="login-content">
        <h1 className="login-title">Login</h1>

        <form className="login-form" onSubmit={handleLogin}>
          <label className="login-label" htmlFor="email">Email:</label>
          <input
            className="login-input"
            type="email"
            id="email"
            placeholder="Insira seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="login-label" htmlFor="password">Senha:</label>
          <input
            className="login-input"
            type="password"
            id="password"
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? <span className="login-loader"></span> : "Entrar"}
          </button>

          <span className="login-warning">
            Ainda não tem uma conta?{" "}
            <Link className="login-link" to="/register">
              Cadastre-se
            </Link>
          </span>
        </form>

        {modal.show && (
          <ModalMessage
            message={modal.message}
            type={modal.type}
            onClose={() => setModal({ ...modal, show: false })}
          />
        )}
      </div>
    </div>
  );
}
