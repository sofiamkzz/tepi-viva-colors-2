const Produto = require('../models/produto'); // Importando o modelo Produto

// Controlador para buscar todos os produtos
exports.getAllProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll(); // Buscar todos os produtos

    // Se não houver produtos
    if (produtos.length === 0) {
      return res.status(404).json({ success: false, message: 'Nenhum produto encontrado' });
    }

    // Retorna os produtos encontrados
    res.status(200).json({ success: true, produtos });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ success: false, message: 'Erro ao buscar produtos no banco de dados' });
  }
};
