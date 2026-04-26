const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, 'database.sqlite'));

const updates = [
  { id: 134, image_url: 'Vanilla Shake.png' },
  { id: 135, image_url: 'Strawberry Shake.png' },
  { id: 136, image_url: 'Mango Shake .png' },
  { id: 137, image_url: 'Chocolate Shake.png' },
];

db.serialize(() => {
  const stmt = db.prepare('UPDATE products SET image_url = ? WHERE product_id = ?');
  updates.forEach(({ id, image_url }) => {
    stmt.run(image_url, id, function (err) {
      if (err) console.error(`Error updating product ${id}:`, err.message);
      else console.log(`✅ product_id ${id} → "${image_url}"`);
    });
  });
  stmt.finalize();

  db.all(
    `SELECT p.product_id, p.product_name, p.image_url FROM products WHERE product_id IN (134,135,136,137)`,
    (err, rows) => {
      if (err) console.error(err);
      else {
        console.log('\nFinal state in database.sqlite:');
        console.table(rows);
        rows.forEach(r => {
          console.log(`  → Frontend will request: /images/products/${r.image_url}`);
        });
      }
      db.close();
    }
  );
});
