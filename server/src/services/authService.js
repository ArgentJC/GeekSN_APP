const _usuarioRepository = require('../repositories/usuarioRepository');
const { Op } = require('sequelize');

class authService {
    /**
     * @description Registra un nuevo usuario en la base de datos
     * @param {Object} usuario - Objeto que contiene los datos del usuario a registrar
     * @returns {Promise<Object>} - Resultado de la operación de registro
     * @throws {Error} - Si el usuario ya existe o si ocurre un error al guardar
     */
    static async register(usuario)  { 
        // Validar que el usuario no sea nulo
        if (!usuario || !usuario.correo || !usuario.nombreUsuario || !usuario.password) {
            throw new Error('Datos del usuario incompletos o nulos');
        }
        // Comprobar si el usuario ya existe en la base de datos
        const existingUser = await _usuarioRepository.findOne({
            where: {
                [Op.or]: [
                    { correo: usuario.correo },
                    { nombreUsuario: usuario.nombreUsuario }
                ]
            }
        });

        if (existingUser) {
            throw new Error('El usuario ya existe con ese correo o nombre de usuario');
        }

        try {
            // Guardar el nuevo usuario
            const data = await _usuarioRepository.create(usuario);

            return { success: true, data: data, message: "Usuario registrado correctamente" };
        }
        catch (error) {
            throw error; // Lanzar el error original
        }
    }
}

module.exports = authService;