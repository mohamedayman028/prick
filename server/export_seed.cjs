const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const all = (sql, params = []) => new Promise((res, rej) =>
    db.all(sql, params, (err, rows) => { err ? rej(err) : res(rows); })
);

async function exportSeed() {
    try {
        let sql = `-- Seed script for SQLite Database\n`;
        sql += `PRAGMA foreign_keys = OFF;\n`;
        sql += `BEGIN TRANSACTION;\n\n`;

        sql += `DROP TABLE IF EXISTS product_prices;\n`;
        sql += `DROP TABLE IF EXISTS products;\n`;
        sql += `DROP TABLE IF EXISTS sizes;\n`;
        sql += `DROP TABLE IF EXISTS categories;\n\n`;

        sql += `CREATE TABLE categories (\n`;
        sql += `    category_id INTEGER PRIMARY KEY AUTOINCREMENT,\n`;
        sql += `    category_name TEXT NOT NULL,\n`;
        sql += `    sort_order INTEGER DEFAULT 0\n`;
        sql += `);\n\n`;

        sql += `CREATE TABLE sizes (\n`;
        sql += `    size_id INTEGER PRIMARY KEY AUTOINCREMENT,\n`;
        sql += `    size_name TEXT NOT NULL UNIQUE\n`;
        sql += `);\n\n`;

        sql += `CREATE TABLE products (\n`;
        sql += `    product_id INTEGER PRIMARY KEY AUTOINCREMENT,\n`;
        sql += `    product_name TEXT NOT NULL,\n`;
        sql += `    category_id INTEGER NOT NULL,\n`;
        sql += `    description_ar TEXT,\n`;
        sql += `    image_url TEXT,\n`;
        sql += `    FOREIGN KEY (category_id) REFERENCES categories (category_id) ON DELETE CASCADE\n`;
        sql += `);\n\n`;

        sql += `CREATE TABLE product_prices (\n`;
        sql += `    price_id INTEGER PRIMARY KEY AUTOINCREMENT,\n`;
        sql += `    product_id INTEGER NOT NULL,\n`;
        sql += `    size_id INTEGER NOT NULL,\n`;
        sql += `    price REAL NOT NULL,\n`;
        sql += `    FOREIGN KEY (product_id) REFERENCES products (product_id) ON DELETE CASCADE,\n`;
        sql += `    FOREIGN KEY (size_id) REFERENCES sizes (size_id) ON DELETE CASCADE\n`;
        sql += `);\n\n`;

        // Categories
        const categories = await all("SELECT * FROM categories ORDER BY category_id");
        sql += `-- Categories\n`;
        for (const c of categories) {
            const name = c.category_name.replace(/'/g, "''");
            sql += `INSERT INTO categories (category_id, category_name, sort_order) VALUES (${c.category_id}, '${name}', ${c.sort_order});\n`;
        }
        sql += `\n`;

        // Sizes
        const sizes = await all("SELECT * FROM sizes ORDER BY size_id");
        sql += `-- Sizes\n`;
        for (const s of sizes) {
            const name = s.size_name.replace(/'/g, "''");
            sql += `INSERT INTO sizes (size_id, size_name) VALUES (${s.size_id}, '${name}');\n`;
        }
        sql += `\n`;

        // Products
        const products = await all("SELECT * FROM products ORDER BY product_id");
        sql += `-- Products\n`;
        for (const p of products) {
            const name = p.product_name ? `'${p.product_name.replace(/'/g, "''")}'` : 'NULL';
            const desc = p.description_ar ? `'${p.description_ar.replace(/'/g, "''")}'` : 'NULL';
            const img = p.image_url ? `'${p.image_url.replace(/'/g, "''")}'` : 'NULL';
            sql += `INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES (${p.product_id}, ${name}, ${p.category_id}, ${desc}, ${img});\n`;
        }
        sql += `\n`;

        // Product Prices
        const prices = await all("SELECT * FROM product_prices ORDER BY price_id");
        sql += `-- Product Prices\n`;
        for (const pr of prices) {
            sql += `INSERT INTO product_prices (price_id, product_id, size_id, price) VALUES (${pr.price_id}, ${pr.product_id}, ${pr.size_id}, ${pr.price});\n`;
        }
        sql += `\nCOMMIT;\nPRAGMA foreign_keys = ON;\n`;

        fs.writeFileSync(path.join(__dirname, 'seed.sql'), sql, 'utf8');
        console.log('✅ Exported seed.sql successfully!');
    } catch (err) {
        console.error('Error exporting seed.sql:', err);
    } finally {
        db.close();
    }
}

exportSeed();
