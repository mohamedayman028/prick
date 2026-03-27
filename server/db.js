const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');

console.log('--- DB INIT ---');
console.log('process.cwd():', process.cwd());
console.log('__dirname:', __dirname);
console.log('dbPath resolved to:', dbPath);

// Initialize database connection via Promisified sqlite wrapper
const dbPromise = open({
    filename: dbPath,
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READONLY
}).then(db => {
    console.log('Successfully connected to SQLite database at:', dbPath);
    return db;
}).catch(err => {
    console.error('Error connecting to SQLite database:', err.message);
    throw err;
});

// Wrapper to return promises so it aligns with what server.js expects 
// e.g., const [rows] = await db.query('SELECT ...')
module.exports = {
    query: async (sql, params = []) => {
        const db = await dbPromise;
        const rows = await db.all(sql, params);
        return [rows]; // Match existing `[rows]` destructuring expectation in server.js
    },
    run: async (sql, params = []) => {
        const db = await dbPromise;
        return await db.run(sql, params);
    }
};