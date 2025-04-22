const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');

router.get('/', carrinhoController.getCart);
router.post('/adicionar/:id', carrinhoController.addToCart);
router.delete('/remover/:id', carrinhoController.removeFromCart);
router.get('/pagamento', carrinhoController.getPayment);

module.exports = router;