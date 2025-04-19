const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');  // Verifique o caminho do controlador

// Rotas de usuários
router.get('/admin', userController.getAllUsers);
router.post('/login', userController.loginUser);
router.post('/cadastro', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/admin/:id', userController.deleteUser);

module.exports = router;