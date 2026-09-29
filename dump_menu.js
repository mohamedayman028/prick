const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const query = `
    SELECT 
        c.category_id,
        c.category_name,
        p.product_id,
        p.product_name,
        p.description_ar,
        p.image_url,
        sz.size_id,
        sz.size_name,
        pp.price
    FROM categories c
    JOIN products p ON c.category_id = p.category_id
    LEFT JOIN product_prices pp ON p.product_id = pp.product_id
    LEFT JOIN sizes sz ON pp.size_id = sz.size_id
    ORDER BY c.sort_order, p.product_id, sz.size_id
`;

db.all(query, [], (err, rows) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(JSON.stringify(rows, null, 2));
    db.close();
});
