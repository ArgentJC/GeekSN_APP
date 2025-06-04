const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const { sequelize } = require('../sequelize'); // Importa la función de prueba de conexión
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json()); // Para parsear cuerpos de solicitud JSON
app.use(cors()); // Habilita CORS para todas las rutas

// Sincronizar modelos con la base de datos
// Esto creará o alterará las tablas según las definiciones de tus modelos.
sequelize.sync({ alter: true }) // { alter: true } intenta hacer cambios no destructivos
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("Error al sincronizar la base de datos:", err);
        process.exit(1);
    });

// Rutas de la API
app.use('/api/auth', authRoutes); // Usa las rutas de autenticación bajo el prefijo /api/auth

// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.send('¡Servidor Express funcionando!');
});

// Middleware para manejar errores no capturados
app.use((err, req, res, next) => {
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
});
