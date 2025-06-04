import _db from '../config/db.js';
import bcrypt from 'bcryptjs';

export class UsuarioModel {
    /**
   * @description Función que crea un nuevo usuario en la base de datos
   * @param {*} usuarioData Datos del usuario a crear
   * @returns Usuario creado
   */
    static async create(usuarioData) {
        try {
            // Validar los datos del usuario
            if (!usuarioData.nombreUsuario || !usuarioData.password || !usuarioData.correo || !usuarioData.nombre || !usuarioData.apellido1) {
                throw new Error('Faltan campos obligatorios');
            }

            // Hashear la contraseña antes de crear el usuario
            const hashedPassword = await bcrypt.hash(usuarioData.password, 10);
            usuarioData.password = hashedPassword;

            // Crear el usuario en la base de datos
            const usuario = (await _db).query('INSERT INTO usuario (nombreUsuario, password, correo, nombre, apellido1, apellido2) VALUES (?, ?, ?, ?, ?, ?)', {
                replacements: [usuarioData.nombreUsuario, hashedPassword, usuarioData.correo, usuarioData.nombre, usuarioData.apellido1, usuarioData.apellido2],
                type: _db.QueryTypes.INSERT
            });

            if (!usuario) {
                return { message: "Error al crear el usuario", success: false };
            } else {
                return { message: "Usuario creado correctamente", success: true, data: usuario };
            }

        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error('Error de validación: ' + error.message);
            }
            throw new Error('Error al crear el usuario: ' + error.message);
        }
    }

    /**
     * @description Función que trata de buscar un usuario por su correo o nombre de usuario
     * @param {string} identifier - Correo o nombre de usuario del usuario a buscar
     * @returns {Promise<Object>} - Usuario encontrado o null si no existe
     */
    static async getByIdentifier(identifier) {
        try {
            if (!identifier) {
                return { message: "El identificador no puede ser nulo", success: false };
            }
            
            // Buscamos el usuario por correo
            const usuario = await (await _db).query('SELECT * FROM usuario WHERE correo = ? OR nombreUsuario = ?', {
                replacements: [identifier, identifier],
                type: _db.QueryTypes.SELECT
            });
            
            // Si no se encuentra el usuario, devolvemos un mensaje indicando que no se encontró
            if (usuario.length === 0) {
                return { message: "Usuario no encontrado", success: false, data: null };
            }
            
            return { message: "Usuario encontrado", success: true, data: usuario[0] || null };
        }
        catch (error) {
            return { message: "Error al buscar el usuario: " + error.message, success: false, data: null };
        }
    }
}
