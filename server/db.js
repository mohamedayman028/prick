const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(process.cwd(), 'server', 'database.sqlite');

console.log('--- DB INIT ---');
console.log('process.cwd():', process.cwd());
console.log('__dirname:', __dirname);
console.log('dbPath resolved to:', dbPath);

// Initialize database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Successfully connected to SQLite database at:', dbPath);
    }
});

// Wrapper to return promises so it aligns with what server.js expects 
// e.g., const [rows] = await db.query('SELECT ...')
module.exports = {
    query: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve([rows]);
                }
            });
        });
    },
    run: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this);
                }
            });
        });
    }
};