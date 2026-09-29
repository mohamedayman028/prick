const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log("Database file path:", dbPath);

db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
    if (err) {
        console.error("Error reading tables:", err);
        return;
    }
    console.log("Tables:", tables.map(t => t.name));

    db.all("SELECT * FROM sizes", (err, sizes) => {
        if (err) console.error("Error reading sizes:", err);
        else console.log("Sizes in DB:", sizes);

        db.all(`
            SELECT c.category_name, COUNT(DISTINCT p.product_id) as product_count, 
                   SUM(CASE WHEN pp.size_id = 1 THEN 1 ELSE 0 END) as small_count,
                   SUM(CASE WHEN pp.size_id = 2 THEN 1 ELSE 0 END) as medium_count,
                   SUM(CASE WHEN pp.size_id = 3 THEN 1 ELSE 0 END) as large_count
            FROM categories c
            LEFT JOIN products p ON c.category_id = p.category_id
            LEFT JOIN product_prices pp ON p.product_id = pp.product_id
            GROUP BY c.category_id
        `, (err, rows) => {
            if (err) console.error("Error reading products/prices summary:", err);
            else {
                console.log("Category price levels summary:");
                console.table(rows);
            }
            db.close();
        });
    });
});
