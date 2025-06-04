// server/src/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController'); // Importa el controlador de autenticación

const router = express.Router();

router.post('/register', authController.register);

module.exports = router;