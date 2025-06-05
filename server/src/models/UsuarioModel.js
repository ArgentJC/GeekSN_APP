import _db from '../config/db.js';
import bcrypt from 'bcryptjs';

export class UsuarioModel {
    /**
     * @description Función que crea un nuevo usuario en la base de datos
     * @param {Object} usuarioData Datos del usuario a crear
     * @returns {Promise<Object>} Resultado de la operación
     */
    static async create({ usuarioData }) {
        try {
            const camposRequeridos = ['nombreUsuario', 'password', 'correo', 'nombre', 'apellido1'];
            const camposFaltantes = camposRequeridos.filter(campo => !usuarioData[campo]?.trim());

            if (camposFaltantes.length > 0) {
                return {
                    message: `Faltan campos obligatorios: ${camposFaltantes.join(', ')}`,
                    success: false,
                    data: null
                };
            }

            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(usuarioData.correo)) {
                return {
                    message: "El formato del correo electrónico no es válido",
                    success: false,
                    data: null
                };
            }

            // Validar longitud de contraseña
            if (usuarioData.password.length < 6) {
                return {
                    message: "La contraseña debe tener al menos 6 caracteres",
                    success: false,
                    data: null
                };
            }

            // Verificar si el usuario ya existe
            const usuarioExistente = await this.getByIdentifier({
                identifier: usuarioData.nombreUsuario
            });

            // Si encontramos un usuario que ya tiene el nombre de usuario que se iba a introducir, devolvemos un error
            if (usuarioExistente.success) {
                return {
                    message: "El nombre de usuario ya está en uso",
                    success: false,
                    data: null
                };
            }

            // Verificar si el correo ya existe
            const correoExistente = await this.getByIdentifier({
                identifier: usuarioData.correo
            });

            // Si encontramos un usuario con correo igual al que vamos a introducir, devolvemos un error
            if (correoExistente.success) {
                return {
                    message: "El correo electrónico ya está registrado",
                    success: false,
                    data: null
                };
            }

            // Hasheamos la contraseña del usuario para guardarla de forma que no se vea el texto plano
            const hashedPassword = await bcrypt.hash(usuarioData.password, 10);

            // Preparamos todos los datos recibidos para insertarlos en la base de datos
            const usuarioFinal = {
                nombreUsuario: usuarioData.nombreUsuario.trim(),
                correo: usuarioData.correo.toLowerCase().trim(),
                nombre: usuarioData.nombre.trim(),
                apellido1: usuarioData.apellido1.trim(),
                apellido2: usuarioData.apellido2?.trim() || null
            };

            // Crear el usuario en la base de datos
            const db = await _db;
            // Insertamos los valores del usuario dentro de la base de datos
            const [resultado] = await db.query(
                'INSERT INTO usuario (nombre_usuario, password, correo, nombre, apellido1, apellido2) VALUES (?, ?, ?, ?, ?, ?)',
                [
                    usuarioFinal.nombreUsuario,
                    hashedPassword,
                    usuarioFinal.correo,
                    usuarioFinal.nombre,
                    usuarioFinal.apellido1,
                    usuarioFinal.apellido2
                ]
            );

            // Si el resultado nos da false o algún error, devolvemos un error desde la función
            if (resultado.affectedRows === 0) {
                return {
                    message: "Error al crear el usuario en la base de datos",
                    success: false,
                    data: null
                };
            }

            // Dentro del return no incluimos la contraseña hasheada, obviamente
            return {
                message: "Usuario creado correctamente",
                success: true,
                data: {
                    id: resultado[0],
                    nombreUsuario: usuarioFinal.nombreUsuario,
                    correo: usuarioFinal.correo,
                    nombre: usuarioFinal.nombre,
                    apellido1: usuarioFinal.apellido1,
                    apellido2: usuarioFinal.apellido2
                }
            };

        } catch (error) {
            console.error('Error en UsuarioModel.create:', error);

            return {
                message: "Error interno del servidor al crear el usuario" + error.message,
                success: false
            };
        }
    }

    /**
     * @description Función que busca un usuario por correo o nombre de usuario
     * @param {string} identifier - Correo o nombre de usuario
     * @returns {Promise<Object>} Usuario encontrado o mensaje de error
     */
    static async getByIdentifier({ identifier }) {
        try {
            if (!identifier?.trim()) {
                return {
                    message: "El identificador no puede estar vacío",
                    success: false,
                    data: null
                };
            }

            const identifierLimpio = identifier.trim();
            const db = await _db;

            const usuario = await db.query(
                'SELECT nombre_usuario, correo, nombre, apellido1, apellido2, created_at FROM usuario WHERE correo = ? OR nombre_usuario = ?',
                {
                    replacements: [identifierLimpio, identifierLimpio],
                    type: db.QueryTypes.SELECT
                }
            );

            if (!usuario || usuario.length === 0) {
                return {
                    message: "Usuario no encontrado",
                    success: false,
                    data: null
                };
            }

            return {
                message: "Usuario encontrado",
                success: true,
                data: usuario[0]
            };

        } catch (error) {
            console.error('Error en UsuarioModel.getByIdentifier:', error);
            return {
                message: "Error interno del servidor al buscar el usuario",
                success: false,
                data: null
            };
        }
    }

    /**
     * @description Verifica si una contraseña coincide con el hash almacenado
     * @param {string} password - Contraseña en texto plano
     * @param {string} hashedPassword - Contraseña hasheada
     * @returns {Promise<boolean>} True si coinciden, false si no
     */
    static async verifyPassword(password, hashedPassword) {
        try {
            return await bcrypt.compare(password, hashedPassword);
        } catch (error) {
            return { message: "Error interno de la función" + error.message, success: false};
        }
    }
}