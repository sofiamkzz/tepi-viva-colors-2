import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

const Conta = () => {
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null); // Dados do usuário
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        cep: '',
        logradouro: '',
        cidade: '',
        estado: '',
        bairro: '',
        complemento: '',
        newPassword: '',
    });
    const [errorMsg, setErrorMsg] = useState('');

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/me', {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();

            console.log("Dados do usuário:", data.user);

            if (data.success) {
                const userData = {
                    nome: data.user.nome || '',
                    email: data.user.email || '',
                    cep: data.user.cep || '',
                    logradouro: data.user.logradouro || '',
                    cidade: data.user.cidade || '',
                    estado: data.user.estado || '',
                    bairro: data.user.bairro || '',
                    complemento: data.user.complemento || '',
                    newPassword: '', // não vem da API
                };
                setUser(data.user);
                setFormData(userData);
            } else {
                setErrorMsg('Erro ao carregar dados do usuário.');
            }
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
            setErrorMsg("Erro de conexão com o servidor.");
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        if (formData.newPassword && formData.newPassword.length < 6) {
            setErrorMsg("A senha deve ter no mínimo 6 caracteres.");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/users/' + user.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setUser({ ...formData });
                setShowModal(false);
                alert("Dados atualizados com sucesso!");
            } else {
                alert("Erro ao atualizar os dados!");
            }
        } catch (error) {
            console.error("Erro ao atualizar dados:", error);
            alert("Erro de conexão com o servidor.");
        }
    };

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (!user) {
        return <div>Carregando...</div>;
    }

    return (
        <div style={{ backgroundColor: '#fff4f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ background: 'linear-gradient(90deg, #e70a3a8f 20%, rgba(255,255,255,0) 78%, rgba(209, 11, 54, 0.564) 100%)' }}>
                <div className="container">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><a className="nav-link" href="/">Produtos</a></li>
                        <li className="nav-item"><a className="nav-link" href="/historicoCompras">Histórico</a></li>
                        <li className="nav-item"><a className="nav-link" href="/carrinho">Carrinho</a></li>
                        <li className="nav-item"><a className="nav-link" href="/logout">Sair</a></li>
                    </ul>
                </div>
            </nav>

            <header className="text-center mt-4">
                <h1>Minha Conta</h1>
                <p className="lead">Gerencie seus dados e preferências</p>
            </header>

            {errorMsg && <div className="alert alert-danger text-center">{errorMsg}</div>}

            <main className="container my-4">
                <div className="text-center p-4" style={{ backgroundColor: '#f0dadf8f', borderRadius: 15 }}>
                    <i className="fas fa-user-circle" style={{ fontSize: '3rem', color: '#d6336c' }}></i>
                    <h4>Dados Pessoais</h4>
                    <p>Nome: {user.nome}</p>
                    <p>Email: {user.email}</p>
                    <Button style={{ backgroundColor: '#d6336c' }} onClick={() => setShowModal(true)}>
                        Editar Dados
                    </Button>
                </div>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Dados Pessoais</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSaveChanges}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome:</Form.Label>
                                <Form.Control type="text" name="nome" value={formData.nome} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
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
                                <Form.Label>Nova Senha:</Form.Label>
                                <Form.Control type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} placeholder="Nova senha" />
                            </Form.Group>
                            <Button type="submit" style={{ backgroundColor: '#d6336c' }}>Salvar Alterações</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </main>

            <footer className="bg-light py-4 mt-auto">
                <div className="container text-center">
                    <p className="mb-0">&copy; 2024 Viva Colors. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default Conta;
