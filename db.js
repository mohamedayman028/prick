const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
let dbInstance = null;

async function getDb() {
    if (!dbInstance) {
        return new Promise((resolve, reject) => {
            console.log('--- DB LAZY INIT (sqlite3) ---');
            // Connect directly to the physical database file (no in-memory fallback)
            const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
                if (err) {
                    console.error('CRITICAL: Failed to connect to database at:', dbPath);
                    console.error('Error:', err.message);
                    return reject(err);
                }

                // Handle file locking by waiting up to 5000ms before returning SQLITE_BUSY
                db.configure('busyTimeout', 5000);
                db.run('PRAGMA foreign_keys = ON;', (pragmaErr) => {
                    if (pragmaErr) {
                        console.error('Error setting PRAGMA foreign_keys:', pragmaErr);
                    }
                    dbInstance = db;
                    console.log('Successfully connected to physical SQLite database at:', dbPath);
                    resolve(db);
                });
            });
        });
    }
    return dbInstance;
}

module.exports = {
    getDb,
    query: async (sql, params = []) => {
        const db = await getDb();
        return new Promise((resolve, reject) => {
            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve([rows]); // Wrapped in array to match previous [rows] destructuring expectation
            });
        });
    },
    run: async (sql, params = []) => {
        const db = await getDb();
        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) reject(err);
                else resolve(this);
            });
        });
    },
    // Adding explicit transaction helpers for price updates or data modifications
    beginTransaction: async () => {
        const db = await getDb();
        return new Promise((resolve, reject) => {
            db.run('BEGIN EXCLUSIVE TRANSACTION;', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },
    commitTransaction: async () => {
        const db = await getDb();
        return new Promise((resolve, reject) => {
            db.run('COMMIT;', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },
    rollbackTransaction: async () => {
        const db = await getDb();
        return new Promise((resolve, reject) => {
            db.run('ROLLBACK;', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }
};