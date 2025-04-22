const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');  // Verifique o caminho do controlador

// Rotas de usuários
router.get('/admin', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/cadastro', userController.createUser);
router.put('/admin/:id', userController.updateUser);
router.delete('/admin/:id', userController.deleteUser);

module.exports = router;