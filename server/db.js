const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(process.cwd(), 'server', 'database.sqlite');
let SQL = null;
let dbInstance = null;

async function getDb() {
    if (!dbInstance) {
        console.log('--- DB LAZY INIT (sql.js) ---');
        console.log('process.cwd():', process.cwd());
        console.log('__dirname:', __dirname);
        const wasmPath = path.join(process.cwd(), 'server', 'node_modules', 'sql.js', 'dist', 'sql-wasm.wasm');
        
        if (!SQL) {
            console.log('--- Loading WASM from:', wasmPath, '---');
            SQL = await initSqlJs({
                locateFile: file => wasmPath
            });
        }

        if (!fs.existsSync(dbPath)) {
            console.error('CRITICAL: Database file not found at:', dbPath);
            // Dump directory contents for diagnostics
            try { console.log('process.cwd() contents:', fs.readdirSync(process.cwd())); } catch (e) {}
            try { console.log('server/ contents:', fs.readdirSync(path.join(process.cwd(), 'server'))); } catch (e) {}
            throw new Error(`Database file not found at ${dbPath}`);
        }

        const fileBuffer = fs.readFileSync(dbPath);
        dbInstance = new SQL.Database(fileBuffer);
        console.log('Successfully loaded SQLite database into memory from:', dbPath);
    }
    return dbInstance;
}

// Helper to convert sql.js result format to standard [rows] format 
function formatResults(res) {
    if (!res || res.length === 0) return [];
    const columns = res[0].columns;
    const values = res[0].values;
    return values.map(row => {
        const obj = {};
        columns.forEach((col, i) => {
            obj[col] = row[i];
        });
        return obj;
    });
}

module.exports = {
    query: async (sql, params = []) => {
        const db = await getDb();
        const res = db.exec(sql, params);
        return [formatResults(res)];
    },
    run: async (sql, params = []) => {
        const db = await getDb();
        const res = db.run(sql, params);
        return res;
    }
};