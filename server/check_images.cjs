const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const imgDir = path.join(__dirname, '../client/public/images/products');
const files = fs.readdirSync(imgDir);

console.log('--- Existing image files in public/images/products matching Dessert/Cake/San/Donut/Cookie/Tiramisu ---');
files.filter(f => /cheesecake|cheese|cake|molten|san|tiramisu|cookie|donut|oreo/i.test(f)).forEach(f => console.log('  ', f));

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));
db.all("SELECT product_id, product_name, image_url FROM products WHERE category_id = 13", (err, rows) => {
    console.log('\n--- Current DB Dessert Products & image_url ---');
    rows.forEach(r => {
        const exists = files.includes(r.image_url);
        console.log(`[ID ${r.product_id}] ${r.product_name} | image_url: "${r.image_url}" => ${exists ? '✅ EXISTS' : '❌ MISSING'}`);
    });
    db.close();
});
