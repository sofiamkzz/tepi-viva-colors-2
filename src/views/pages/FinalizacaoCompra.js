import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Finalizacao = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const copyPixKey = () => {
    const pixKey = document.getElementById('pix-key');
    navigator.clipboard.writeText(pixKey.value);
    alert('Chave PIX copiada!');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <div className="navbar-brand fw-bold text-dark-pink">
            <img src="papelaria.jpg" alt="Logo Viva Colors" style={{ height: '50px' }} />
            Viva Colors
          </div>
        </div>
      </nav>

      <header className="py-3 text-center">
        <div className="container">
          <h1 style={{ color: '#d42249', fontWeight: 'bold' }}>Finalização de Compra</h1>
          <p className="lead">Escolha a forma de pagamento e finalize sua compra</p>
        </div>
      </header>

      <main className="container my-5">
        <form>
          <div className="mb-4">
            <h3>Selecione a forma de pagamento:</h3>
            <div className="form-check">
              <input
                type="radio"
                id="payment-card"
                name="payment-method"
                value="card"
                className="form-check-input"
                checked={paymentMethod === 'card'}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="payment-card" className="form-check-label">Cartão de Crédito</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="payment-debit"
                name="payment-method"
                value="debit"
                className="form-check-input"
                checked={paymentMethod === 'debit'}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="payment-debit" className="form-check-label">Cartão de Débito</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="payment-pix"
                name="payment-method"
                value="pix"
                className="form-check-input"
                checked={paymentMethod === 'pix'}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="payment-pix" className="form-check-label">PIX</label>
            </div>
          </div>

          {paymentMethod === 'card' && (
            <div id="credit-card-payment" className="payment-option">
              <h4><i className="fas fa-credit-card"></i> Pagamento com Cartão de Crédito</h4>
              <div className="mb-3">
                <label htmlFor="card-name" className="form-label">Nome no Cartão</label>
                <input type="text" id="card-name" className="form-control" placeholder="Nome completo" />
              </div>
              <div className="mb-3">
                <label htmlFor="card-number" className="form-label">Número do Cartão</label>
                <input type="text" id="card-number" className="form-control" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="card-expiry" className="form-label">Validade</label>
                  <input type="text" id="card-expiry" className="form-control" placeholder="MM/AA" />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="card-cvv" className="form-label">CVV</label>
                  <input type="text" id="card-cvv" className="form-control" placeholder="123" />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'debit' && (
            <div id="debit-card-payment" className="payment-option">
              <h4><i className="fas fa-credit-card"></i> Pagamento com Cartão de Débito</h4>
              <div className="mb-3">
                <label htmlFor="debit-card-name" className="form-label">Nome no Cartão</label>
                <input type="text" id="debit-card-name" className="form-control" placeholder="Nome completo" />
              </div>
              <div className="mb-3">
                <label htmlFor="debit-card-number" className="form-label">Número do Cartão</label>
                <input type="text" id="debit-card-number" className="form-control" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="debit-card-expiry" className="form-label">Validade</label>
                  <input type="text" id="debit-card-expiry" className="form-control" placeholder="MM/AA" />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="debit-card-cvv" className="form-label">CVV</label>
                  <input type="text" id="debit-card-cvv" className="form-control" placeholder="123" />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'pix' && (
            <div id="pix-payment" className="payment-option">
              <h4><i className="fas fa-qrcode"></i> Pagamento com PIX</h4>
              <p>Escaneie o QR Code ou copie a chave abaixo:</p>
              <div className="text-center">
                <img src="https://via.placeholder.com/200" alt="QR Code PIX" className="img-fluid mb-3" />
              </div>
              <div className="mb-3">
                <label htmlFor="pix-key" className="form-label">Chave PIX</label>
                <div className="input-group">
                  <input type="text" id="pix-key" className="form-control" value="exemplo-chave-pix@dominio.com" readOnly />
                  <button type="button" className="btn btn-outline-secondary" onClick={copyPixKey}>Copiar</button>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary btn-lg">Finalizar Compra</button>
          </div>
        </form>
      </main>

      <footer className="bg-light-pink py-4">
        <div className="container text-center">
          <p className="text-dark-pink mb-0">&copy; 2025 Viva Colors. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Finalizacao;
