const _authService = require('../services/authService');

/**
 * @description Controlador para manejar las peticiones de autenticación de la aplicación.
 * @module authController
 * @requires module:services/authService
 */
const authController = {
    /**
     * @function register
     * @description Endpoint para registrar a un nuevo usuario dentro de nuestra aplicación.
     * @param {Object} req - Objeto de solicitud que contiene los datos del usuario a registrar.
     * @param {Object} res - Objeto de respuesta que se enviará al cliente.
     * @property {string} req.body.username - Nombre de usuario del nuevo usuario.
     * @property {string} req.body.password - Contraseña del nuevo usuario.
     * @property {string} req.body.email - Correo electrónico del nuevo usuario.
     * @property {string} req.body.nombre - Nombre del nuevo usuario.
     * @property {string} req.body.apellido1 - Primer apellido del nuevo usuario.
     * @property {string} req.body.apellido2 - Segundo apellido del nuevo usuario.
     * @returns {Object} Respuesta JSON que indica el éxito o fracaso del registro.
     * @throws {Error} Si ocurre un error interno del servidor.
     */
    register: async (req, res) => {
        const { username, password, email, nombre, apellido1, apellido2 } = req.body; // Recogemos los datos del usuario desde la request.

        // Comprobamos que los datos del usuario no sean nulos o no existen
        if (!username || !password || !email || !nombre || !apellido1 || !apellido2) {
            return res.status(400).json({ message: "Alguno de los campos es nulo o no existe", success: false });
        }

        try {
            // Creamos un nuevo usuario con los datos recogidos desde la request
            const _nuevoUsuario = {
                nombreUsuario: username,
                password: password,
                correo: email,
                nombre: nombre,
                apellido1: apellido1,
                apellido2: apellido2
            };

            // Llamamos al servicio de autenticación para registrar al nuevo usuario
            const response = await _authService.register(_nuevoUsuario);

            // Si la respuesta del servicio es exitorsa, devolvemos un mensaje de éxito con el nuevo usuario creado
            if (response.success) {
                return res.status(201).json({ message: "Usuario creado correctamente", success: true, data: response.data });
            }
            else { // Si la respuesta es errónea, devolvemos un mensaje de error con el motivo del fallo
                return res.status(400).json({ message: response.message, success: false });
            }
        }
        catch (error) { // Si ocurre un error interno del servidor, devolvemos un mensaje de error genérico
            return res.status(500).json({ message: error.message, success: false });
        }

    }
}

module.exports = authController;