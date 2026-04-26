const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('server/database.sqlite');

db.all(
  `SELECT p.product_id, p.product_name, p.image_url, sz.size_name, pp.price
   FROM products p
   JOIN product_prices pp ON p.product_id = pp.product_id
   JOIN sizes sz ON pp.size_id = sz.size_id
   WHERE p.category_id = 3 AND p.product_id >= 134
   ORDER BY p.product_id, sz.size_id`,
  (err, rows) => {
    if (err) { console.error(err); }
    else { console.table(rows); }
    db.close();
  }
);
