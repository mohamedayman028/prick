const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('server/database.sqlite');

const query = `
SELECT p.product_id, p.product_name, s.size_name, pp.price
FROM products p
JOIN product_prices pp ON p.product_id = pp.product_id
JOIN sizes s ON pp.size_id = s.size_id
WHERE p.product_id IN (1,2,3,7,9,11,12,14,67,68,69,71,73,74,17,18,89,91,92,43,44,161,167,168,169,170,171,172,173,174,175,176,180,181,182,183,184,185,20,21,22,23,24,26,27,28,29,30,31,32)
ORDER BY p.product_id, pp.size_id
`;

db.all(query, [], (err, rows) => {
  if (err) { console.error(err); return; }
  rows.forEach(r => console.log(r.product_id + ' | ' + r.product_name.substring(0,35) + ' | ' + r.size_name + ' | ' + r.price));
  db.close();
});
