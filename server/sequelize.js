const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './.env' }); // Asegúrate de que la ruta a .env sea correcta

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mariadb', // O 'mariadb' si es MariaDB y quieres usar el driver 'mariadb'
        logging: false, // Puedes poner true para ver las queries SQL que genera Sequelize
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

module.exports = {
    sequelize
};