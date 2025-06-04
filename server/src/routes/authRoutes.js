import express from 'express';

import { authController } from '../controllers/authController.js'; // Importa el controlador de autenticación
import { UsuarioModel } from '../models/UsuarioModel.js'; // Importa el modelo de usuario

const authControllerInstance = new authController({ usuarioModel: UsuarioModel }); // Crea una instancia del controlador de autenticación

export const createAuthRouter = ({ usuarioModel }) => {
    const authRouter = express.Router();

    const authController = new authController({ usuarioModel });
    
    // Define la ruta para el registro de usuarios
    authRouter.post('/register', authControllerInstance.register);

    return authRouter;
}