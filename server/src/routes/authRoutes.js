import { Router } from 'express';
import { authController } from '../controllers/authController.js'; // Importa el controlador de autenticación

export const createAuthRouter = ({ usuarioModel }) => {
    const authRouter = Router();

    const controller = new authController({ usuarioModel });
    
    // Define la ruta para el registro de usuarios
    authRouter.post('/register', controller.register);

    return authRouter;
}