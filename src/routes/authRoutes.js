const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.get('/me', authController.getLoggedUser);
router.post('/logout', authController.logout);

module.exports = router;