const express = require('express');
const router = express.Router();
const favoritosController = require('../controllers/favoritosController');

// Adiciona um produto aos favoritos
router.post('/:id', favoritosController.addFavorite);

// Remove um produto dos favoritos
router.delete('/favoritos/:productId', favoritosController.removeFavorite);

// Busca todos os favoritos do usuário
router.get('/', favoritosController.getFavorites);

module.exports = router;
