import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Favoritos = () => {
  const produtosFavoritos = [
    {
      id: 1,
      nome: "Caneta Gel 0.5mm Molin",
      preco: "R$ 24,50",
      imagem: "https://images.tcdn.com.br/img/img_prod/1106500/caneta_gel_0_5mm_molin_flowers_18905_1_76afef01e147364b2e08014134ad0ef2.jpg"
    },
  ];

  const handleRemoveFavorite = async (productId) => {
    try {
      const response = await fetch(`/api/favoritos/remover/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao remover produto dos favoritos');
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
      alert('Erro ao remover o produto dos favoritos');
    }
  };

  return (
    <div className="bg-light py-4">
      <div className="container text-center mb-4">
        <h1 className="text-dark-pink fw-bold">Meus Favoritos</h1>
        <p className="lead">Explore e compre seus itens favoritos da nossa papelaria!</p>
      </div>

      <div className="container">
        <div className="row text-center g-4">
          {produtosFavoritos.map((produto) => (
            <div className="col-md-4" key={produto.id}>
              <div className="favorite-card shadow-sm p-3 bg-white rounded">
                <img src={produto.imagem} alt={produto.nome} className="img-fluid rounded" />
                <h5 className="mt-3">{produto.nome}</h5>
                <p className="text-main">{produto.preco}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <a href="/carrinho" className="btn btn-main">Comprar</a>
                  <FaHeart
                    className="remove-favorite"
                    title="Remover dos Favoritos"
                    onClick={() => handleRemoveFavorite(produto.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-light-pink py-4">
        <div className="container text-center">
          <p className="text-dark-pink mb-0">&copy; 2025 Viva Colors. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default Favoritos;