import React, { useState, useEffect } from 'react';

const Carrinho = () => {
  const [itens, setItens] = useState([]);
  const [total, setTotal] = useState(0);
  const [mensagem, setMensagem] = useState('');

  // Carregar os itens do carrinho
  useEffect(() => {
    fetch('http://localhost:8080/carrinho', {
      credentials: 'include', // importante para enviar o cookie da sessão!
    })
      .then(res => res.json())
      .then(data => {
        if (data.mensagem) setMensagem(data.mensagem);
        setItens(data.cartItems || []);
        setTotal(data.total || 0);
      })
      .catch(err => {
        console.error('Erro ao buscar carrinho:', err);
        setMensagem('Erro ao carregar o carrinho.');
      });
  }, []);

  // Alterar a quantidade de um item
  const handleQuantidadeChange = async (id, quantidade) => {
    const item = itens.find(item => item.id === id);
    if (item) {
      // Atualizar o estado local
      setItens(itens.map(i => i.id === id ? { ...i, quantidade } : i));

      try {
        await fetch(`http://localhost:8080/carrinho/atualizar/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantidade }),
          credentials: 'include',
        });

        // Atualizar o total após a modificação
        const newTotal = itens.reduce((acc, item) => acc + (item.quantidade * item.produto.preco), 0);
        setTotal(newTotal);
      } catch (err) {
        console.error('Erro ao atualizar a quantidade:', err);
        setMensagem('Erro ao atualizar a quantidade.');
      }
    }
  };

  // Remover um item do carrinho
  const handleRemoverItem = async (id) => {
    try {
      await fetch(`http://localhost:8080/carrinho/remover/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      setItens(itens.filter(item => item.id !== id));
    } catch (err) {
      console.error('Erro ao remover item:', err);
      setMensagem('Erro ao remover item.');
    }
  };

  return (
    <div style={{ backgroundColor: '#fff4f9', fontFamily: "'Poppins', sans-serif", color: '#6a0572' }}>
      {/* Navbar */}
      {/* ... (mantém igual ao seu código atual) */}

      {/* Carrinho */}
      <main className="container my-5">
        <h2 className="text-center mb-4">Seu Carrinho de Compras</h2>
        {mensagem && <p className="text-danger text-center">{mensagem}</p>}
        <table className="table table-bordered">
          <thead className="bg-light">
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {itens.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img src={item.produto?.imagem || item.imagem} alt={item.produto?.nome || item.nome} style={{ width: '50px', height: 'auto' }} className="me-3" />
                    {item.produto?.nome || item.nome}
                  </div>
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.quantidade}
                    min="1"
                    onChange={(e) => handleQuantidadeChange(item.id, parseInt(e.target.value))}
                  />
                </td>
                <td>R$ {item.produto?.preco.toFixed(2) || item.preco.toFixed(2)}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleRemoverItem(item.id)}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-end">
          <h4>Total: R$ {parseFloat(total).toFixed(2)}</h4>
          <a href="finalizarCompra" className="btn" style={{ background: 'linear-gradient(90deg, #d42249, #ffccf9)', border: 'none', color: 'white', padding: '10px 20px', fontWeight: 'bold', borderRadius: '30px' }}>Finalizar Compra</a>
        </div>
      </main>

      <footer className="bg-light py-4 mt-5">
        <div className="container text-center">
          <p className="mb-0">&copy; 2024 Viva Colors. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Carrinho;
