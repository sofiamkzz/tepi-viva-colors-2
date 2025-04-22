import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function Produtos() {
    const [user, setUser] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const navigate = useNavigate();

    // Função para buscar os dados do usuário
    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/me', {
                method: 'GET',
                credentials: 'include', // Isso envia o cookie de sessão com a requisição
            });

            const data = await response.json();

            if (data.success) {
                setUser(data.user);  // Atualiza o estado com os dados do usuário
            } else {
                setUser(null);  // Se não estiver logado, define o estado como null
            }
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
            setErrorMsg("Erro de conexão com o servidor.");
        }
    };

    // Função para buscar os produtos do banco de dados
    const fetchProdutos = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/produtos');
            const data = await response.json();

            if (data.success) {
                setProdutos(data.produtos);  // Atualiza o estado com a lista de produtos
            } else {
                setProdutos([]);  // Se não houver produtos, define o estado como array vazio
            }
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            setErrorMsg("Erro ao carregar os produtos.");
        }
    };

    useEffect(() => {
        // Chama a função para verificar os dados do usuário e carregar os produtos ao montar o componente
        fetchUserData();
        fetchProdutos();
    }, []); // Esse useEffect será chamado uma vez quando o componente for montado

    return (
        <>
            <header className="bg-light-pink py-3 text-center">
                <div className="container">
                    <h1 className="text-dark-pink fw-bold">Viva Colors</h1>
                    <p className="lead">A melhor loja de papelaria para você!</p>
                </div>
            </header>

            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                <div className="container">
                    <div className="navbar-brand fw-bold text-dark-pink">
                        <img src="papelaria.jpg" alt="Logo Viva Colors" style={{ height: '50px' }} />
                        Viva Colors
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href={user ? "/conta" : "/login"}
                                >
                                    Minha Conta
                                </a>
                            </li>
                            <li className="nav-item cart-icon">
                                <a className="nav-link" href="/carrinho">
                                    <i className="fas fa-shopping-cart"></i>
                                    <span className="badge bg-danger">0</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Carrossel com slides fixos */}
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://assets.ype.ind.br/uploads/material_escolar_ypedia-scaled.jpg" className="d-block w-100" alt="Slide 1" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Viva Colors</h5>
                            <p>Bem vindos(as)!</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://jornadaedu.com.br/wp-content/uploads/2023/01/economizar-no-material-escolar.png" className="d-block w-100" alt="Slide 2" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Nossos Produtos</h5>
                            <p>Produtos exclusivos e de alta qualidade.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.simpack.pt/core/conteudos/Mala-com-material-escolar-Simpack.jpeg" className="d-block w-100" alt="Slide 3" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Grandes Ofertas!</h5>
                            <p>Aproveite nossas promoções imperdíveis.</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                    <span className="visually-hidden">Anterior</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                    <span className="visually-hidden">Próximo</span>
                </button>
            </div>

            <main className="container my-5">
                <section className="text-center mb-5">
                    <h2 className="text-dark-pink">Cartão Fidelidade</h2>
                    <p className="lead">Na primeira compra, pedidos acima de R$150,00 recebem um cartão fidelidade</p>
                    <p className="lead">E 5% da sua compra vai estar ajudando a campanha do mês.</p>
                </section>

                <div className="row">
                    {produtos.length === 0 ? (
                        <p>Carregando produtos...</p>
                    ) : (
                        produtos.map((produto, index) => (
                            <div className="col-md-4 col-lg-3 mb-4" key={index}>
                                <div className="card shadow-sm">
                                    <img src={produto.imagem} className="card-img-top" alt={produto.nome} />
                                    <div className="card-body position-relative">
                                        <h5 className="card-title">{produto.nome}</h5>
                                        <p className="card-text">{produto.preco}</p>
                                        <a href={`/carrinho/${produto.id}`} className="btn btn-main">Comprar</a>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            <footer className="bg-light-pink py-4">
                <div className="container text-center">
                    <p className="text-dark-pink mb-0">&copy; 2024 Viva Colors. Todos os direitos reservados.</p>
                </div>
            </footer>
        </>
    );
}