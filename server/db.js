const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(process.cwd(), 'server', 'database.sqlite');

let dbPromise = null;

function getDb() {
    if (!dbPromise) {
        console.log('--- DB LAZY INIT ---');
        console.log('process.cwd():', process.cwd());
        console.log('__dirname:', __dirname);
        console.log('dbPath resolved to:', dbPath);

        dbPromise = open({
            filename: dbPath,
            driver: sqlite3.Database,
            mode: sqlite3.OPEN_READONLY
        }).then(db => {
            console.log('Successfully connected to SQLite database at:', dbPath);
            return db;
        }).catch(err => {
            console.error('CRITICAL: Error connecting to SQLite database:', err.message);
            console.error('Stack Trace:', err.stack);
            
            // Helpful diagnostics dumps to Vercel Logs if it fails
            try { console.log('process.cwd() contents:', fs.readdirSync(process.cwd())); } catch (e) {}
            try { console.log('server/ contents:', fs.readdirSync(path.join(process.cwd(), 'server'))); } catch (e) {}

            dbPromise = null; // allow retry
            throw err;
        });
    }
    return dbPromise;
}

// Wrapper to return promises so it aligns with what server.js expects 
module.exports = {
    query: async (sql, params = []) => {
        const db = await getDb();
        const rows = await db.all(sql, params);
        return [rows]; // Match existing `[rows]` destructuring expectation in server.js
    },
    run: async (sql, params = []) => {
        const db = await getDb();
        return await db.run(sql, params);
    }
};