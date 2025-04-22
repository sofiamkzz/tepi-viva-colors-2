import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart } from 'react-icons/fa';

const HistoricoCompras = () => {
  const orders = [
    {
      id: '#12345',
      date: '10/10/2024',
      product: 'Caneta Gel 0.5mm Molin Flowers',
      quantity: 2,
      price: 24.50,
      total: 49.00,
      status: 'Aceito',
      paymentMethod: 'Cartão de Crédito',
      imageUrl: 'https://images.tcdn.com.br/img/img_prod/1106500/caneta_gel_0_5mm_molin_flowers_18905_1_76afef01e147364b2e08014134ad0ef2.jpg'
    },
    {
      id: '#12346',
      date: '15/09/2024',
      product: 'Caderno Tilibra Connect 10 Matérias BunnyFly',
      quantity: 1,
      price: 48.50,
      total: 48.50,
      status: 'Em Processo',
      paymentMethod: 'PayPal',
      imageUrl: 'https://images.tcdn.com.br/img/img_prod/1106500/caderno_universitario_tilibra_connect_10_materias_bunnyfly_19875_1_294eccbadcf81f92597acc0957ea97a3.jpg'
    },
    {
      id: '#12347',
      date: '20/08/2024',
      product: 'Marca Texto Tris Holic Cute com Carimbo',
      quantity: 3,
      price: 11.90,
      total: 35.70,
      status: 'Entregue',
      paymentMethod: 'Boleto Bancário',
      imageUrl: 'https://images.tcdn.com.br/img/img_prod/1106500/marca_texto_tris_holic_cute_com_carimbo_19829_1_6d0f3d7728c1834ae7b16e1aaa23d230.jpg'
    },
    {
      id: '#12348',
      date: '25/07/2024',
      product: 'Estojo - Kipling - 100 Pens Blush Metallic',
      quantity: 1,
      price: 524.99,
      total: 524.99,
      status: 'Cancelado',
      paymentMethod: 'Cartão de Crédito',
      imageUrl: 'https://papelariaunicornio.com.br/cdn/shop/files/203492-1200-auto_11zon.jpg?v=1722342000&width=493'
    }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Aceito':
        return 'status-aceito';
      case 'Em Processo':
        return 'status-em-processo';
      case 'Entregue':
        return 'status-entregue';
      case 'Cancelado':
        return 'status-cancelado';
      default:
        return '';
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light" style={{ background: 'linear-gradient(90deg, #e70a3a8f 20%, rgba(255,255,255,0) 78%, rgba(209, 11, 54, 0.564) 100%)' }}>
        <div className="container">
          <div className="navbar-brand fw-bold text-dark-pink">
            <img src="papelaria.jpg" alt="Logo Viva Colors" style={{ height: '50px' }} />
            Viva Colors
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Histórico de Pedido</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="index.html">Início</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="favoritos.html">Favoritos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="promocoes.html">Promoções</a>
              </li>
              <li className="nav-item cart-icon">
                <a className="nav-link" href="carrinho.html">
                  <FaShoppingCart />
                  <span className="badge bg-danger">0</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="py-3 text-center">
        <div className="container">
          <h1>Histórico de Compras</h1>
          <p className="lead">Veja suas compras anteriores</p>
        </div>
      </header>

      {/* Histórico de Compras */}
      <main className="container my-5">
        <div className="row">
          <div className="col-md-12">
            {orders.map((order) => (
              <div className="order-card" key={order.id} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
                <h4>{`Pedido ${order.id}`}</h4>
                <p>Data: {order.date}</p>
                <div className="row">
                  <div className="col-md-8">
                    <div className="d-flex align-items-center">
                      <img src={order.imageUrl} alt={order.product} className="product-image" style={{ width: '80px', height: 'auto', marginRight: '10px' }} />
                      <ul>
                        <li>Produto: {order.product}</li>
                        <li>Quantidade: {order.quantity}</li>
                        <li>Preço: R$ {order.price.toFixed(2)}</li>
                        <li>Total: R$ {order.total.toFixed(2)}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-4 text-end">
                    <div className={`order-status ${getStatusClass(order.status)}`}>Status: {order.status}</div>
                    <div>Forma de Pagamento: {order.paymentMethod}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-light-pink py-4">
        <div className="container text-center">
          <p className="text-dark-pink mb-0">&copy; 2025 Viva Colors. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default HistoricoCompras;