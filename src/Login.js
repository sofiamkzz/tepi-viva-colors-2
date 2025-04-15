import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  
  const navigate = useNavigate(); // Mova o useNavigate para o topo

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const loginData = {
      email: formData.email,
      senha: formData.senha,
    };

    axios
      .post("https://localhost:3000/api/login", loginData)
      .then((response) => {
        if (response.data.success) {
          console.log("Login bem-sucedido!");
          navigate("/conta"); // Redireciona para a página de conta
        } else {
          console.log("Erro no login:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Erro ao fazer login:", error);
      });
  };

  return (
    <div className="container my-5">
      <div className="form-container">
        <h1 className="text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Digite seu email"
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
              onChange={handleChange}
              value={formData.senha}
            />
          </div>
          <button type="submit" className="btn btn-main btn-block">
            Entrar
          </button>
          <p className="text-center mt-3">
            Não tem uma conta? <a href="cadastro">Cadastre-se</a>
          </p>
    

        </form>
      </div>
    </div>
  );
};

export default Login;