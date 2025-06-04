import express, { json } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv'
dotenv.config({ path: '../.env' });

import { createAuthRouter } from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(json()); // Para parsear cuerpos de solicitud JSON
app.use(cors()); // Habilita CORS para todas las rutas
app.disable('x-powered-by'); // Deshabilita el encabezado x-powered-by para mayor seguridad

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Rutas de la API
app.use('/api/auth', createAuthRouter); // Usa las rutas de autenticación bajo el prefijo /api/auth

// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.send('¡Servidor Express funcionando!');
});

// Middleware para manejar errores no capturados
app.use((err, req, res, next) => {
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
});
