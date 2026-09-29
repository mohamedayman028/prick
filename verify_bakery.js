const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, 'database.sqlite'));

db.all(`
  SELECT p.product_id, p.product_name, p.image_url
  FROM products p
  JOIN categories c ON p.category_id = c.category_id
  WHERE c.category_name = 'Bakery'
  ORDER BY p.product_id
`, (err, rows) => {
  if (err) throw err;
  console.log('\n=== Bakery Products (DB Verification) ===\n');
  let allGood = true;
  rows.forEach(r => {
    const name = r.product_name.split('|')[0].trim();
    const hasPlaceholder = !r.image_url || r.image_url === 'default.jpg' || r.image_url === 'default.png';
    const status = hasPlaceholder ? 'PLACEHOLDER' : 'OK';
    if (hasPlaceholder) allGood = false;
    console.log('[' + r.product_id + '] ' + name.padEnd(30) + ' -> ' + r.image_url + '  [' + status + ']');
  });
  console.log('\n' + (allGood ? 'ALL GOOD: All Bakery products have real images!' : 'ISSUE: Some products still use placeholders.'));
  db.close();
});
