import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    numeroTelefone: '',
    cep: '',
    logradouro: '',
    cidade: '',
    estado: '',
    bairro: '',
    complemento: '',
    senha: ''
  });

  // Função para formatar o CEP no padrão 00000-000
  const formatarCep = (cep) => {
    cep = cep.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Limita o CEP a 8 caracteres, pois CEP válido tem no máximo 8 dígitos
    cep = cep.substring(0, 8);

    // Aplica a máscara para o formato 00000-000
    return cep.length <= 5
      ? cep.replace(/(\d{5})(\d{0,3})/, '$1-$2')
      : cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const formatarTelefone = (telefone) => {
    telefone = telefone.replace(/\D/g, ''); 

    if (telefone.length <= 10) {
      return telefone.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      return telefone.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cep') {
      const cepFormatado = formatarCep(value);
      setFormData({ ...formData, [name]: cepFormatado });

      if (cepFormatado.length === 9) {
        buscarEnderecoPorCep(cepFormatado.replace('-', ''));
      }
    } else if (name === 'numeroTelefone') {
      const telefoneFormatado = formatarTelefone(value);
      setFormData({ ...formData, [name]: telefoneFormatado });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const buscarEnderecoPorCep = async (cep) => {
    try {
      // Faz a requisição para a API ViaCEP
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
  
      if (data.erro) {
        alert('CEP inválido!');
        return;
      }
  
      // Formata o CEP com hífen novamente
      const cepFormatado = formatarCep(cep);
  
      // Atualiza o estado com a cidade e o estado retornados, mantendo o CEP formatado
      setFormData({
        ...formData,
        cep: cepFormatado,
        cidade: data.localidade,
        estado: data.uf,
        logradouro: data.logradouro,
        bairro: data.bairro,
      });
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
    }
  };  


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/users/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar usuário');
      }

      const data = await response.json();
      console.log('Cadastro realizado:', data);

      // Redireciona após o cadastro
      navigate('/'); // Supondo que você queira redirecionar para a página de login
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert(error);
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
          <form action="/users/cadastro" onSubmit={handleSubmit} method="POST">
            <div className="form-group mb-3">
              <label htmlFor="nome">Nome:</label>
              <input 
              type="text" 
              className="form-control" 
              id="nome" 
              name="nome" 
              required 
              onChange={handleChange} 
              value={formData.nome}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
                onChange={handleChange}
                value={formData.email}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="numeroTelefone">Número de telefone:</label>
              <input
                type="text"
                className="form-control"
                id="numeroTelefone"
                name="numeroTelefone"
                required
                onChange={handleChange}
                value={formData.numeroTelefone}
                maxLength="15" // Limita ao tamanho da máscara
              />
            </div>


            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="cep">CEP:</label>
                <input
                  type="text"
                  className="form-control"
                  id="cep"
                  name="cep"
                  required
                  onChange={handleChange}
                  value={formData.cep}
                  maxLength="10" // Limita o CEP a 10 caracteres
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="logradouro">Logradouro:</label>
                <input
                  type="text"
                  className="form-control"
                  id="logradouro"
                  name="logradouro"
                  required
                  onChange={handleChange}
                  value={formData.logradouro}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="cidade">Cidade:</label>
                <input
                  type="text"
                  className="form-control"
                  id="cidade"
                  name="cidade"
                  required
                  onChange={handleChange}
                  value={formData.cidade}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="estado">Estado:</label>
                <input
                  type="text"
                  className="form-control"
                  id="estado"
                  name="estado"
                  required
                  onChange={handleChange}
                  value={formData.estado}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="bairro">Bairro:</label>
                <input
                  type="text"
                  className="form-control"
                  id="bairro"
                  name="bairro"
                  required
                  onChange={handleChange}
                  value={formData.bairro}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="complemento">Complemento:</label>
                <input
                  type="text"
                  className="form-control"
                  id="complemento"
                  name="complemento"
                  onChange={handleChange}
                  value={formData.complemento}
                />
              </div>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="senha">Senha:</label>
              <input
                type="password"
                className="form-control"
                id="senha"
                name="senha"
                required
                onChange={handleChange}
                value={formData.senha}
              />
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