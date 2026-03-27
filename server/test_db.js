const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
    const config = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'abrisk_menu',
    };

    console.log('Connecting with config:', { ...config, password: '***' });

    try {
        const connection = await mysql.createConnection(config);
        console.log('Successfully connected to the database.');

        const [tables] = await connection.query('SHOW TABLES');
        console.log('Tables in database:', tables.map(row => Object.values(row)[0]));

        await connection.end();
    } catch (err) {
        console.error('Error connecting to the database:', err.message);
        if (err.code === 'ER_BAD_DB_ERROR') {
            console.log('Database does not exist. Creating it...');
            try {
                const conn = await mysql.createConnection({
                    host: config.host,
                    user: config.user,
                    password: config.password
                });
                await conn.query(`CREATE DATABASE IF NOT EXISTS ${config.database}`);
                console.log(`Database ${config.database} created.`);
                await conn.end();
            } catch (createErr) {
                console.error('Error creating database:', createErr.message);
            }
        }
    }
}

testConnection();
