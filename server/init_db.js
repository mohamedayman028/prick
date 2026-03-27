const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');

async function initDB() {
    console.log('Starting fresh: Deleting old database.sqlite if it exists...');
    if (fs.existsSync(dbPath)) {
        try {
            fs.unlinkSync(dbPath);
            console.log('Deleted old database.db');
        } catch (e) {
            console.log('Could not delete database.db (likely locked by the running server). Relying on schema.sql to drop old tables.');
        }
    }

    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
            process.exit(1);
        }
    });

    const runQuery = (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.run(sql, params, function(err) {
                if (err) reject(err);
                else resolve(this);
            });
        });
    };

    const execQuery = (sql) => {
        return new Promise((resolve, reject) => {
            db.exec(sql, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    };

    try {
        console.log('Connecting to database...');
        console.log('Connected to SQLite database.');

        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        const seedText = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');

        console.log('Executing schema.sql...');
        await execQuery(schema);
        console.log('Schema applied successfully.');

        console.log('Executing seed.sql...');
        
        // Disable FK checks just in case
        await runQuery('PRAGMA foreign_keys = OFF;');
        
        // Split seed.sql by ';' to run each statement and log progress
        const statements = seedText.split(';').map(s => s.trim()).filter(s => s.length > 0);
        
        for (let i = 0; i < statements.length; i++) {
            const stmt = statements[i];
            await runQuery(stmt);
            if (stmt.toUpperCase().startsWith('INSERT')) {
                // Extract table name for logging
                const match = stmt.match(/INSERT\s+INTO\s+(\w+)/i);
                const table = match ? match[1] : 'table';
                console.log(`[${i + 1}/${statements.length}] Inserted records into ${table}.`);
            } else {
                console.log(`[${i + 1}/${statements.length}] Executed statement.`);
            }
        }
        
        await runQuery('PRAGMA foreign_keys = ON;');
        console.log('Seed data applied successfully.');

    } catch (err) {
        console.error('Error during database initialization:', err.message);
    } finally {
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Connection closed.');
            }
        });
    }
}

initDB();
