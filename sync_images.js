const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const updateImages = () => {
    db.all("SELECT product_id, product_name FROM products", [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return;
        }

        const stmt = db.prepare("UPDATE products SET image_url = ? WHERE product_id = ?");

        rows.forEach((row) => {
            const englishName = row.product_name.split('|')[0].trim();
            const imageUrl = `/images/products/${englishName}.png`;
            
            stmt.run(imageUrl, row.product_id, (err) => {
                if (err) {
                    console.error(`Error updating product ${row.product_id}:`, err.message);
                } else {
                    console.log(`Updated ${row.product_id}: ${englishName}`);
                }
            });
        });

        stmt.finalize();
    });
};

updateImages();
// Close the database after a delay to ensure all updates are processed
setTimeout(() => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Database connection closed.');
        }
    });
}, 5000);
