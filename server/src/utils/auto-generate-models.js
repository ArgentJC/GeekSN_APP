// server/generate-models.js
const SequelizeAuto = require('sequelize-auto');
require('dotenv').config({ path: './.env' }); // Asegúrate de que la ruta a .env sea correcta

const auto = new SequelizeAuto(
    process.env.DB_NAME,       // Nombre de la base de datos
    process.env.DB_USER,       // Usuario de la base de datos
    process.env.DB_PASSWORD,   // Contraseña del usuario
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mariadb',          // O 'mariadb' si es MariaDB
        directory: './src/models', // Directorio donde se guardarán los modelos generados
        caseModel: 'p',            // 'p' para PascalCase (ej. 'Usuario')
        caseFile: 'k',             // 'k' para kebab-case (ej. 'usuario.js')
        caseProp: 'c',             // 'c' para camelCase (ej. 'idVideojuego')
        singularize: true,         // Nombres de modelo en singular (ej. 'Usuario' en lugar de 'Usuarios')
    }
);

auto.run()
    .then(data => {
        console.log('Modelos generados exitosamente!');
    })
    .catch(err => {
        console.error('Error al generar modelos:', err);
    });
