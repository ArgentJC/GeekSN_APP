import { createConnection } from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config({ path: '' }); 

console.log('--- Configuración de la Base de Datos ---');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : 'No definida'); // No mostrar la contraseña real
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('---------------------------------------');

/**
 * @description Configuracion de conexion a la base de datos
 * @param host El host actual de la base de datos
 * @param user El usuario con el que se accede a la base de datos
 * @param password Contraseña de conexion
 * @param database Nombre de la base de datos
 * @param port Puerto de conexion
 */
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10) || 3306 // Asegúrate de que el puerto sea un número, y un valor por defecto
};

/**
 * @description Se establece la conexión a la base de datos en base a una configuración previa
 */
const connection = (async () => {
    try {
        const conn = await createConnection(dbConfig);
        console.log('Conexión a la base de datos establecida correctamente.');
        return conn;
    } catch (error) {
        console.error('Error al conectar con la base de datos:');
        console.error('Código de error:', error.code); // 'ECONNREFUSED', 'ER_ACCESS_DENIED_ERROR', etc.
        console.error('Mensaje de error:', error.message);
        console.error('Asegúrate de que el servidor de la base de datos esté corriendo y que las credenciales/configuración sean correctas.');
        return null;
    }
})();

export default connection;
