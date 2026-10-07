const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

// Check categories and current dessert prices
db.all(`SELECT c.category_id, c.category_name FROM categories WHERE LOWER(category_name) LIKE '%dessert%' OR LOWER(category_name) LIKE '%bakery%'`, (e, cats) => {
    console.log('Categories:', JSON.stringify(cats));
    
    db.all(`SELECT p.product_id, p.product_name, pp.size_id, pp.price 
            FROM products p 
            LEFT JOIN product_prices pp ON p.product_id = pp.product_id
            WHERE p.product_id IN (93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,121,122,129,166)
            ORDER BY p.product_id, pp.size_id`, (e2, rows) => {
        if (e2) console.error(e2);
        rows.forEach(r => console.log(`[${r.product_id}] ${r.product_name} | size:${r.size_id} price:${r.price}`));
        db.close();
    });
});
