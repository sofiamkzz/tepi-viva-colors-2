import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import '../css/admin.css';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cep: '',
    endereco: '',
    cidade: '',
    estado: '',
    bairro: '',
    complemento: '',
    newPassword: ''
  });

  useEffect(() => {
    fetch('http://localhost:8080/users/admin')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar usuários:', error);
      });
  }, []);

  const removerUsuario = (id) => {
    if (window.confirm("Tem certeza que deseja remover este usuário?")) {
      fetch(`http://localhost:8080/users/admin/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then(() => {
          setUsers(users.filter(user => user.id !== id));
        })
        .catch((err) => console.error("Erro ao remover usuário:", err));
    }
  };

  const handleEditUser = (user) => {
    setSelectedUserId(user.id);
    setFormData({
      nome: user.nome,
      email: user.email,
      numeroTelefone: user.numeroTelefone,
      cep: user.cep || '',
      logradouro: user.logradouro || '',
      cidade: user.cidade || '',
      estado: user.estado || '',
      bairro: user.bairro || '',
      complemento: user.complemento || '',
      newPassword: ''
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const dadosAtualizados = {
      nome: formData.nome,
      email: formData.email,
      numeroTelefone: formData.numeroTelefone,
      cep: formData.cep,
      logradouro: formData.logradouro,
      cidade: formData.cidade,
      estado: formData.estado,
      bairro: formData.bairro,
      complemento: formData.complemento,
    };

    if (formData.newPassword) {
      dadosAtualizados.senha = formData.newPassword;
    }

    try {
      const response = await fetch(`http://localhost:8080/users/admin/${selectedUserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosAtualizados)
      });

      if (!response.ok) throw new Error('Erro ao atualizar usuário');

      const userAtualizado = await response.json();
      setUsers(users.map(u => u.id === userAtualizado.id ? userAtualizado : u));
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "#d42249" }}>
        <div className="container">
          <div className="navbar-brand fw-bold text-dark-pink">
            <img src="papelaria.jpg" alt="Logo Viva Colors" style={{ height: "50px" }} />
            Viva Colors
          </div>
        </div>
      </nav>

      <header className="text-center">
        <div className="container"><br></br>
          <h1 className="admin-header-title">Admin - Gerenciar Usuários</h1>
          <p className="admin-header-description">Aqui você pode atualizar ou remover usuários</p>
        </div>
      </header>

      <main className="container my-5">
        <div className="user-info-panel">

          <h4>Administração de Conta</h4>
          <p>Gerencie os dados dos usuários de forma eficiente.</p>
        </div>

        <div className="user-list-panel">
          <h4>Usuários Registrados</h4>
          {users.map((user, index) => (
            <div key={index} className="user-card d-flex justify-content-between align-items-center">
              <div>
                <p>
                  <strong>{user.nome}</strong><br />
                  {user.email}
                </p>
              </div>
              <div>
                <button className="btn btn-warning me-2" onClick={() => handleEditUser(user)}>Atualizar</button>
                <button className="btn btn-danger" onClick={() => removerUsuario(user.id)}>Remover</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Dados Pessoais</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveChanges} method="PUT">
            <Form.Group className="mb-3">
              <Form.Label>Nome:</Form.Label>
              <Form.Control type="text" name="nome" value={formData.nome} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Número de telefone:</Form.Label>
              <Form.Control type="text" name="numeroTelefone" value={formData.numeroTelefone} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>CEP:</Form.Label>
              <Form.Control type="text" name="cep" value={formData.cep} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Logradouro:</Form.Label>
              <Form.Control type="text" name="logradouro" value={formData.logradouro} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cidade:</Form.Label>
              <Form.Control type="text" name="cidade" value={formData.cidade} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado:</Form.Label>
              <Form.Control type="text" name="estado" value={formData.estado} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bairro:</Form.Label>
              <Form.Control type="text" name="bairro" value={formData.bairro} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Complemento:</Form.Label>
              <Form.Control type="text" name="complemento" value={formData.complemento} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Senha:</Form.Label>
              <Form.Control type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} placeholder="Nova senha" />
            </Form.Group>
            <Button type="submit" style={{ backgroundColor: '#d6336c' }} onClick={handleSaveChanges}>Salvar alterações</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <footer className="bg-light-pink py-4">
        <div className="container text-center">
          <p className="text-dark-pink mb-0">&copy; 2025 Viva Colors. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Admin;