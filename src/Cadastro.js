import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cadastro.css';

const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cep: '',
    endereco: '',
    cidade: '',
    estado: '',
    bairro: '',
    complemento: '',
    senha: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Verifique a URL correta do seu backend
      const response = await fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // formData é o estado com os campos do form
      });

      const data = await response.json();
      console.log('Cadastro realizado:', data);
  
      // Redireciona após o cadastro
      navigate('/login'); // Supondo que você queira redirecionar para a página de login
  
    } catch (error) {
      console.error('Erro no cadastro:', error);
    }
  };

  return (
    <div className="register-wrapper">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav"></div>
        </div>
      </nav>

      <div className="container my-5" id="cadastro">
        <div className="form-container">
          <h1>Cadastro</h1>
          <form onSubmit={handleSubmit} method="POST">
            <div className="form-group mb-3">
              <label htmlFor="nome">Nome:</label>
              <input type="text" className="form-control" id="nome" name="nome" required onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" name="email" required onChange={handleChange} />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="cep">CEP</label>
                <input type="text" className="form-control" id="cep" name="cep" required onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="endereco">Endereço</label>
                <input type="text" className="form-control" id="endereco" name="endereco" required onChange={handleChange} />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="cidade">Cidade</label>
                <input type="text" className="form-control" id="cidade" name="cidade" required onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="estado">Estado</label>
                <input type="text" className="form-control" id="estado" name="estado" required onChange={handleChange} />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="bairro">Bairro</label>
                <input type="text" className="form-control" id="bairro" name="bairro" required onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="complemento">Complemento</label>
                <input type="text" className="form-control" id="complemento" name="complemento" onChange={handleChange} />
              </div>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="senha">Senha</label>
              <input type="password" className="form-control" id="senha" name="senha" required onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-main w-100">Cadastrar</button>
            <p className="text-center mt-3">Já tem uma conta? <a href="/login">Faça login</a>.</p>
          </form>
        </div>
      </div>

      <footer className="bg-light d-flex align-items-center justify-content-center">
        <p className="mb-0">&copy; 2025 Viva Colors. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default Cadastro;