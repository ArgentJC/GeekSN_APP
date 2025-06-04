const _usuarioRepository = require('../repositories/usuarioRepository');
const { Op } = require('sequelize');

const authService = {
    register: async (usuario) => {
        // Verificar si el usuario ya existe
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