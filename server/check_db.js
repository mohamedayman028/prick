const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.all("SELECT product_id, product_name, category_id FROM products ORDER BY product_id ASC", (err, rows) => {
    if (err) throw err;
    console.log(rows);
});
