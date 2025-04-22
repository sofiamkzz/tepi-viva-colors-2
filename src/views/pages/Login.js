import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // <- ESSENCIAL para enviar e receber cookies
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Login bem-sucedido!");
        navigate("/conta");
      } else {
        console.log("Erro no login:", data.message);
        setErrorMsg(data.message);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErrorMsg("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="container my-5">
      <div className="form-container">
        <h1 className="text-center">Login</h1>

        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Digite seu email"
              required
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              className="form-control"
              id="senha"
              name="senha"
              placeholder="Digite sua senha"
              required
              onChange={handleChange}
              value={formData.senha}
            />
          </div>

          <button type="submit" className="btn btn-main btn-block">
            Entrar
          </button>

          <p className="text-center mt-3">
            Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;