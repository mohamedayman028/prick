const fs = require('fs');

const seedText = fs.readFileSync('server/seed.sql', 'utf8');
const statements = seedText.split(';').map(s => s.trim()).filter(s => s.length > 0);

let productId = 1;
for (const stmt of statements) {
    if (stmt.toUpperCase().startsWith('INSERT INTO PRODUCTS')) {
        const matches = stmt.match(/\(.*?\)/g); // simplistic match for tuples
        // Wait, the column names are in the first tuple: (product_name, category_id, description_ar, image_url)
        // Values are the subsequent tuples.
        const valueTuples = matches.slice(1);
        for (const tuple of valueTuples) {
            console.log(`${productId}: ${tuple.split('|')[0].replace(/\('/, '')}`);
            productId++;
        }
    }
}
