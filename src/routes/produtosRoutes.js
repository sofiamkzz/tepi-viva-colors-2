const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtosController');

// Rota para obter todos os produtos
router.get('/produtos', produtoController.getAllProdutos);

module.exports = router;