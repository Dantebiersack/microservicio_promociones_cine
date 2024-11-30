const mysql = require('mysql2/promise');

// Crear pool de conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'utpolis-bd-do-user-17863068-0.g.db.ondigitalocean.com',
    user: process.env.DB_USER || 'doadmin',
    password: process.env.DB_PASSWORD || 'AVNS_JIB4wAgQdb0dIcjKeWT',
    database: process.env.DB_NAME || 'utpolis',
    port: process.env.DB_PORT || 25060, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
