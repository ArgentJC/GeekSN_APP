const mysql = require('mysql2/promise');
const config = require('./config');
require('dotenv').config({ path: '../.server.env' });

const dbConfig = {
    host: process.env.DB_HOST || config.db.host,
    user: process.env.DB_USER || config.db.user,
    password: process.env.DB_PASSWORD || config.db.password,
    database: process.env.DB_NAME || config.db.database,
    port: process.env.DB_PORT || config.db.port,
}

const pool = mysql.createPool(dbConfig);

module.exports = pool;