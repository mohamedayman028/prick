const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('server/database.sqlite');

db.all(`SELECT c.category_name, p.product_id, p.product_name 
        FROM products p JOIN categories c ON p.category_id = c.category_id
        WHERE LOWER(p.product_name) LIKE '%mango%' 
           OR LOWER(p.product_name) LIKE '%cheesecake%'
           OR LOWER(p.product_name) LIKE '%tiramisu%'
           OR LOWER(p.product_name) LIKE '%donut%'
           OR LOWER(p.product_name) LIKE '%cookies%'
           OR LOWER(p.product_name) LIKE '%molten%'
           OR LOWER(p.product_name) LIKE '%oreo cake%'
           OR LOWER(c.category_name) LIKE '%dessert%'
           OR LOWER(c.category_name) LIKE '%ديزرت%'
           OR LOWER(c.category_name) LIKE '%desert%'
        ORDER BY c.category_id, p.product_id`, (err, rows) => {
    if (err) console.error(err);
    else rows.forEach(r => console.log(`[${r.product_id}] ${r.product_name} | ${r.category_name}`));
    db.close();
});
