const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

db.all(`
  SELECT p.product_id, p.product_name, p.category_id, c.category_name, pp.size_id, s.size_name, pp.price
  FROM products p
  JOIN categories c ON p.category_id = c.category_id
  LEFT JOIN product_prices pp ON p.product_id = pp.product_id
  LEFT JOIN sizes s ON pp.size_id = s.size_id
  WHERE LOWER(c.category_name) LIKE '%dessert%' 
     OR LOWER(c.category_name) LIKE '%desert%'
     OR LOWER(c.category_name) LIKE '%حلويات%'
     OR LOWER(c.category_name) LIKE '%bakery%'
     OR LOWER(p.product_name) LIKE '%cake%'
     OR LOWER(p.product_name) LIKE '%tiramisu%'
     OR LOWER(p.product_name) LIKE '%donut%'
     OR LOWER(p.product_name) LIKE '%cookie%'
  ORDER BY c.category_id, p.product_id, pp.size_id
`, [], (err, rows) => {
  if (err) {
    console.error(err);
  } else {
    console.log("=== DESSERT / RELATED PRODUCTS IN DB ===");
    rows.forEach(r => console.log(`[ID:${r.product_id}] (Cat ${r.category_id}: ${r.category_name}) ${r.product_name} | size:${r.size_id} (${r.size_name}) = ${r.price}`));
  }
  
  db.all(`SELECT category_id, category_name FROM categories`, [], (err2, cats) => {
    console.log("\n=== ALL CATEGORIES ===");
    console.table(cats);
    db.close();
  });
});
