import { createConnection } from 'mysql2/promise';
import * as dotenv from 'dotenv'
dotenv.config({ path: '' });

// console.log para demostrar que las variables de entorno se están recogiendo correctamente
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : undefined);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

const connection = createConnection(dbConfig);

export default connection;