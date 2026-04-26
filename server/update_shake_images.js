const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, 'database.sqlite'));

const updates = [
  { id: 134, image_url: '/images/products/Vanilla Shake.png' },
  { id: 135, image_url: '/images/products/Strawberry Shake.png' },
  { id: 136, image_url: '/images/products/Mango Shake .png' },
  { id: 137, image_url: '/images/products/Chocolate Shake.png' },
];

db.serialize(() => {
  const stmt = db.prepare('UPDATE products SET image_url = ? WHERE product_id = ?');
  updates.forEach(({ id, image_url }) => {
    stmt.run(image_url, id, function (err) {
      if (err) console.error(`Error updating product ${id}:`, err.message);
      else console.log(`✅ Updated product_id ${id} → ${image_url}`);
    });
  });
  stmt.finalize();

  // Verify
  db.all(
    `SELECT product_id, product_name, image_url FROM products WHERE product_id IN (134,135,136,137)`,
    (err, rows) => {
      if (err) console.error(err);
      else console.table(rows);
      db.close();
    }
  );
});
