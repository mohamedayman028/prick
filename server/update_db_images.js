const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database.sqlite');
const wasmPath = path.join(__dirname, 'sql-wasm.wasm');

async function updateImages() {
    console.log('--- DB IMAGE SYNC (sql.js) ---');
    
    if (!fs.existsSync(dbPath)) {
        console.error('Database file not found at:', dbPath);
        return;
    }

    const SQL = await initSqlJs({
        locateFile: file => wasmPath
    });

    const fileBuffer = fs.readFileSync(dbPath);
    const db = new SQL.Database(fileBuffer);

    // Get all products
    const res = db.exec("SELECT product_id, product_name FROM products");
    if (res.length === 0) {
        console.log('No products found.');
        return;
    }

    const columns = res[0].columns;
    const values = res[0].values;
    const products = values.map(row => {
        const obj = {};
        columns.forEach((col, i) => obj[col] = row[i]);
        return obj;
    });

    console.log(`Found ${products.length} products. Updating image paths...`);

    let updatedCount = 0;
    products.forEach(product => {
        const englishName = product.product_name.split('|')[0].trim();
        // The user specifically requested only the filename (e.g., coffee.png)
        // We assume most are .png, but we handle the existing extension if possible.
        // For now, following the user's lead of using the name to find the file.
        const imageUrl = `${englishName}.png`;
        
        db.run("UPDATE products SET image_url = ? WHERE product_id = ?", [imageUrl, product.product_id]);
        updatedCount++;
    });

    // Save changes back to disk
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);

    console.log(`Successfully updated ${updatedCount} products in database.sqlite`);
}

updateImages().catch(err => {
    console.error('Error updating images:', err);
});
