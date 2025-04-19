import React, { useState, useEffect } from "react";
import './admin.css'; // Importando o arquivo CSS

const Admin = () => {
  const [users, setUsers] = useState([]); // Estado para armazenar usuários

  // UseEffect para buscar os usuários do backend quando o componente for montado
  useEffect(() => {
    // Chamada para a API que você criou no backend
    fetch('http://localhost:8080/users/admin')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data); // Atualiza o estado com os usuários recebidos
      })
      .catch((error) => {
        console.error('Erro ao buscar usuários:', error);
      });
  }, []); // O array vazio [] garante que a requisição seja feita uma vez quando o componente montar

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "#d42249" }}>
        <div className="container">
          <div className="navbar-brand fw-bold text-dark-pink">
            <img src="papelaria.jpg" alt="Logo Viva Colors" style={{ height: "50px" }} />
            Viva Colors
          </div>
          {/* Restante do código da Navbar */}
        </div>
      </nav>

      {/* Header */}
      <header className="text-center">
        <div className="container">
          <h1 className="admin-header-title">Admin - Gerenciar Usuários</h1>
          <p className="admin-header-description">Aqui você pode atualizar ou remover usuários</p>
        </div>
      </header>

      {/* Admin Panel */}
      <main className="container my-5">
        <div className="user-info-panel">
          <img src="admin-icon.png" alt="Admin Icon" className="admin-icon" />
          <h4>Administração de Conta</h4>
          <p>Gerencie os dados dos usuários de forma eficiente.</p>
        </div>

        {/* User List */}
        <div className="user-list-panel">
          <h4>Usuários Registrados</h4>
          {users.map((user, index) => (
            <div key={index} className="user-card">
              <div>
                <p>
                  <strong>{user.nome}</strong>
                  <br />
                  {user.email}
                </p>
              </div>
              <div>
                <button className="btn btn-warning">Atualizar</button>
                <button className="btn btn-danger">Remover</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-light py-4" style={{ background: "#d42249" }}>
        <div className="container text-center">
          <p className="mb-0">&copy; 2024 Viva Colors. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Admin;