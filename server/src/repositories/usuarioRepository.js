const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { ValidationError } = require('sequelize');

const usuarioRepository = {
  /**
   * @description Función que crea un nuevo usuario en la base de datos
   * @param {*} usuarioData Datos del usuario a crear
   * @returns Usuario creado
   */
  create: async function (usuarioData) {
    try {
      // Validar los datos del usuario
      if (!usuarioData.nombreUsuario || !usuarioData.password || !usuarioData.correo || !usuarioData.nombre || !usuarioData.apellido1) {
        throw new Error('Faltan campos obligatorios');
      }

      // Hashear la contraseña antes de crear el usuario
      const hashedPassword = await bcrypt.hash(usuarioData.password, 10);
      usuarioData.password = hashedPassword;

      // Crear el usuario en la base de datos
      return await Usuario.create(usuarioData);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new Error('Error de validación: ' + error.message);
      }
      throw new Error('Error al crear el usuario: ' + error.message);
    }
  },

  /**
   * @description Función que busca un usuario en la base de datos
   * @param {*} conditions Condiciones de búsqueda
   * @returns Usuario encontrado
   */
  findOne: async function (conditions) {
    try {
      return await Usuario.findOne({ where: conditions }); // Buscamos un usuario que cumpla con las condiciones dadas
    } catch (error) {
      throw new Error('Error al buscar el usuario: ' + error.message);
    }
  }

};

module.exports = usuarioRepository;