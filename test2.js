const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('server/database.sqlite');
db.all("SELECT product_id, product_name FROM products", (err, rows) => {
    rows.forEach(r => console.log(r.product_id + ': ' + r.product_name.split('|')[0]));
});
