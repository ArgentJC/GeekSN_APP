/**
 * @description Controlador para manejar las peticiones de autenticación de la aplicación.
 * @module authController
 * @requires module:services/authService
 */
export class authController {

    /**
     * @description Crea una instancia del controlador de autenticación
     * @param {Object} param0 - Dependencias del controlador
     * @param {Object} param0.usuarioModel - Modelo de usuario
     */
    constructor({ usuarioModel }) {
        this.usuarioModel = usuarioModel;
    }

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
    register = async (req, res) => {
        try {

            // Comprobamos que el request.body no sea vacío o sea un objeto
            if (!req.body || typeof req.body !== 'object') {
                return res.status(400).json({
                    message: "El cuerpo de la petición es requerido",
                    success: false
                });
            }

            // Determinamos los valores del usuario en base a lo que llega desde el request.body
            const { username, password, email, nombre, apellido1, apellido2 } = req.body;

            // Definimos cuales son los campos requeridos
            const camposRequeridos = {
                username: 'Nombre de usuario',
                password: 'Contraseña',
                email: 'Correo electrónico',
                nombre: 'Nombre',
                apellido1: 'Primer apellido',
                apellido2: 'Segundo apellido'
            };

            const camposFaltantes = [];
            for (const [campo, etiqueta] of Object.entries(camposRequeridos)) {
                if (!req.body[campo] || !req.body[campo].toString().trim()) {
                    camposFaltantes.push(etiqueta);
                }
            }

            if (camposFaltantes.length > 0) {
                return res.status(400).json({
                    message: `Los siguientes campos son obligatorios: ${camposFaltantes.join(', ')}`,
                    success: false,
                    camposFaltantes: camposFaltantes
                });
            }

            // Comprobamos que el email tenga una estructura de email correcta y no sea cualquier texto
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    message: "El formato del correo electrónico no es válido",
                    success: false
                });
            }

            // Definimos una longitud mínima de contraseña para que sean robustas
            if (password.length < 6) {
                return res.status(400).json({
                    message: "La contraseña debe tener al menos 6 caracteres",
                    success: false
                });
            }

            // Creamos el nuevo usuario en función de los datos recibidos
            const _nuevoUsuario = {
                nombreUsuario: username.trim(),
                password: password,
                correo: email.toLowerCase().trim(),
                nombre: nombre.trim(),
                apellido1: apellido1.trim(),
                apellido2: apellido2.trim()
            };

            // Mandamos la creación al modelo
            const response = await this.usuarioModel.create({
                usuarioData: _nuevoUsuario
            });

            // Si la creación es correcta, devolvemos un OK y los datos definidos desde el modelo
            if (response.success) {
                return res.status(201).json({
                    message: response.message,
                    success: true,
                    data: response.data
                });
            }
            else { // Si no es una creación correcta, definimos un statusCode de error
                let statusCode = 400;

                if (response.message.includes('ya existe') ||
                    response.message.includes('ya está en uso') ||
                    response.message.includes('ya está registrado')) {
                    statusCode = 409;
                }

                return res.status(statusCode).json({
                    message: response.message,
                    success: false,
                    data: response.data
                });
            }

        } catch (error) { // Definimos una serie de errores internos de la función
            console.error('Error en authController.register:', {
                error: error.message,
                stack: error.stack,
                body: req.body
            });

            return res.status(500).json({
                message: "Error interno del servidor",
                success: false
            });
        }
    }
}