const Carrinho = require('../models/carrinho');
const ItemCarrinho = require('../models/itemCarrinho');
const Produto = require('../models/produto');

const getOrCreateCarrinho = async (usuarioId) => {
  let carrinho = await Carrinho.findOne({ where: { usuarioId } });

  if (!carrinho) {
    carrinho = await Carrinho.create({ usuarioId });
  }

  return carrinho;
};

const getCart = async (req, res) => {
  const usuarioId = req.session.userId;
  if (!usuarioId) return res.status(401).json({ mensagem: 'Usuário não autenticado.' });

  try {
    const carrinho = await getOrCreateCarrinho(usuarioId);

    const itens = await ItemCarrinho.findAll({
      where: { carrinhoId: carrinho.id },
      include: [Produto]
    });

    const total = itens.reduce((acc, item) => acc + (item.quantidade * item.produto.preco), 0);

    res.json({ cartItems: itens, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao carregar o carrinho.', cartItems: [], total: 0 });
  }
};

const addToCart = async (req, res) => {
  const usuarioId = req.session.userId;
  const produtoId = req.params.id;
  const quantidade = 1;

  if (!usuarioId) return res.status(401).json({ mensagem: 'Usuário não autenticado.' });

  try {
    const produto = await Produto.findByPk(produtoId);
    if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado.' });

    if (produto.estoque < quantidade) {
      return res.status(400).json({ mensagem: 'Estoque insuficiente.' });
    }

    const carrinho = await getOrCreateCarrinho(usuarioId);

    let item = await ItemCarrinho.findOne({ where: { carrinhoId: carrinho.id, produtoId } });

    if (item) {
      item.quantidade += quantidade;
      await item.save();
    } else {
      item = await ItemCarrinho.create({
        carrinhoId: carrinho.id,
        usuarioId,
        produtoId,
        quantidade
      });
    }

    res.json({ mensagem: 'Item adicionado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao adicionar item.' });
  }
};

const removeFromCart = async (req, res) => {
  const itemId = req.params.id;

  try {
    await ItemCarrinho.destroy({ where: { id: itemId } });
    res.json({ mensagem: 'Item removido com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao remover item.' });
  }
};

const getPayment = (req, res) => {
  res.json({ mensagem: 'Página de pagamento (placeholder)' });
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  getPayment
};
