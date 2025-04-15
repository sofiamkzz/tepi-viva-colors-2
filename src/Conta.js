import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

const Conta = () => {
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState({
        id: 1,
        name: 'João Silva',
        email: 'joao@viva.com',
        cep: '12345-678',
        endereco: 'Rua das Flores',
        cidade: 'São Paulo',
        estado: 'SP',
        bairro: 'Centro',
        complemento: '',
    });

    const [formData, setFormData] = useState({ ...user, newPassword: '' });

    const handleSaveChanges = (e) => {
        e.preventDefault();
        setUser({ ...formData }); // Atualiza os dados do usuário
        setShowModal(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div style={{ backgroundColor: '#fff4f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light" style={{ background: 'linear-gradient(90deg, #e70a3a8f 20%, rgba(255,255,255,0) 78%, rgba(209, 11, 54, 0.564) 100%)' }}>
                <div className="container">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><a className="nav-link" href="/">Produtos</a></li>
                        <li className="nav-item"><a className="nav-link" href="/historico">Histórico</a></li>
                        <li className="nav-item"><a className="nav-link" href="/carrinho">Carrinho</a></li>
                        <li className="nav-item"><a className="nav-link" href="/logout">Sair</a></li>
                    </ul>
                </div>
            </nav>

            {/* Header */}
            <header className="text-center mt-4">
                <h1>Minha Conta</h1>
                <p className="lead">Gerencie seus dados e preferências</p>
            </header>

            {/* Painel */}
            <main className="container my-4">
                <div className="text-center p-4" style={{ backgroundColor: '#f0dadf8f', borderRadius: 15 }}>
                    <i className="fas fa-user-circle" style={{ fontSize: '3rem', color: '#d6336c' }}></i>
                    <h4>Dados Pessoais</h4>
                    <p>Nome: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <Button style={{ backgroundColor: '#d6336c' }} onClick={() => setShowModal(true)}>
                        Editar Dados
                    </Button>
                </div>

                {/* Modal de edição */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Dados Pessoais</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSaveChanges} method="PUT">
                            <Form.Group className="mb-3">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>CEP</Form.Label>
                                <Form.Control type="text" name="cep" value={formData.cep} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Endereço</Form.Label>
                                <Form.Control type="text" name="endereco" value={formData.endereco} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control type="text" name="cidade" value={formData.cidade} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control type="text" name="estado" value={formData.estado} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Bairro</Form.Label>
                                <Form.Control type="text" name="bairro" value={formData.bairro} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Complemento</Form.Label>
                                <Form.Control type="text" name="complemento" value={formData.complemento} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nova Senha</Form.Label>
                                <Form.Control type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} placeholder="Nova senha" />
                            </Form.Group>
                            <Button type="submit" style={{ backgroundColor: '#d6336c' }}>Salvar Alterações</Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                {/* Favoritos e Pedidos */}
                <div className="row g-4 mt-4">
                    <div className="col-md-6">
                        <div className="p-4 text-center" style={{ borderRadius: 15, boxShadow: '0px 4px 15px rgba(0,0,0,0.1)', border: '1px solid #ddd' }}>
                            <i className="fas fa-heart" style={{ color: '#d6336c', fontSize: '2rem' }}></i>
                            <h4>Meus Favoritos</h4>
                            <p>Você tem 4 produtos favoritos.</p>
                            <a href="/favoritos" className="btn" style={{ backgroundColor: '#d6336c', color: '#fff' }}>Ver Favoritos</a>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="p-4 text-center" style={{ borderRadius: 15, boxShadow: '0px 4px 15px rgba(0,0,0,0.1)', border: '1px solid #ddd' }}>
                            <i className="fas fa-box" style={{ color: '#d6336c', fontSize: '2rem' }}></i>
                            <h4>Histórico de Pedidos</h4>
                            <p>Você tem 3 pedidos realizados.</p>
                            <a href="/historico" className="btn" style={{ backgroundColor: '#d6336c', color: '#fff' }}>Ver Pedidos</a>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-light py-4 mt-auto">
                <div className="container text-center">
                    <p className="mb-0">&copy; 2024 Viva Colors. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default Conta;