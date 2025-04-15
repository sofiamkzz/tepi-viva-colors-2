const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Definindo a rota de cadastro
router.post('/cadastro', userController.register);

// Outras rotas
router.get('/users', userController.getAll);
router.get('/users/:id', userController.getById);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

module.exports = router;